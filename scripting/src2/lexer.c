//
// Created by melkov on 20.08.2025.
//

#include "lexer.h"
#include "str_utils.h"
#include <ctype.h>
#include <stdio.h>

struct token *lex_identifier(const char **c);
struct token *lex_number(const char **c);
struct token *lex_string(const char **c);

struct list *lex(const char *code) {
    struct list *tokens = malloc(sizeof(struct list));
    list_init(tokens);

    const char *c = code;

    while (*c) {
        if (*c == '\0') {
            break;
        }

        if (isspace(*c)) {
            c++;
            continue;
        }

        if (*c == ' ') {
            c++;
            continue;
        }

        if (*c == '#') {
            struct token *token = malloc(sizeof(struct token));
            token->type = TOKEN_TYPE_HASH;
            token->identifier = identifier_type_none;
            token->keyword = keyword_type_none;
            token->value_string = strndup(c, 1);

            list_add(tokens, token);
            c++;
            continue;
        }

        if (isalpha(*c)) {
            struct token *token = lex_identifier(&c);
            list_add(tokens, token);
            continue;
        }

        if (isdigit(*c)) {
            struct token *token = lex_number(&c);
            list_add(tokens, token);
            continue;
        }

        if (*c == '(') {
            struct token *token = malloc(sizeof(struct token));
            token->type = TOKEN_TYPE_LBRACKET;
            token->value_string = strndup(c, 1);
            list_add(tokens, token);
            c++;
            continue;
        }

        if (*c == ')') {
            struct token *token = malloc(sizeof(struct token));
            token->type = TOKEN_TYPE_RBRACKET;
            token->value_string = strndup(c, 1);
            list_add(tokens, token);
            c++;
            continue;
        }

        if (*c == '{') {
            struct token *token = malloc(sizeof(struct token));
            token->type = TOKEN_TYPE_LBRACE;
            token->value_string = strndup(c, 1);
            list_add(tokens, token);
            c++;
            continue;
        }

        if (*c == '}') {
            struct token *token = malloc(sizeof(struct token));
            token->type = TOKEN_TYPE_RBRACE;
            token->value_string = strndup(c, 1);
            list_add(tokens, token);
            c++;
            continue;
        }

        if (*c == '[') {
            struct token *token = malloc(sizeof(struct token));
            token->type = TOKEN_TYPE_LSQUARE;
            token->value_string = strndup(c, 1);
            list_add(tokens, token);
            c++;
            continue;
        }

        if (*c == ']') {
            struct token *token = malloc(sizeof(struct token));
            token->type = TOKEN_TYPE_RSQUARE;
            token->value_string = strndup(c, 1);
            list_add(tokens, token);
            c++;
            continue;
        }

        if (*c == ';') {
            struct token *token = malloc(sizeof(struct token));
            token->type = token_type_semicolon;
            token->value_string = strndup(c, 1);
            list_add(tokens, token);
            c++;
            continue;
        }

        if (*c == ',') {
            struct token *token = malloc(sizeof(struct token));
            token->type = token_type_comma;
            token->value_string = strndup(c, 1);
            list_add(tokens, token);
            c++;
            continue;
        }

        if (*c == ':') {
            c++;

            if (*c == ':') {
                struct token *token = malloc(sizeof(struct token));
                token->type = TOKEN_TYPE_TO;
                token->value_string = strndup("::", 2);
                list_add(tokens, token);
                c++;
            } else {
                struct token *token = malloc(sizeof(struct token));
                token->type = TOKEN_TYPE_USE;
                token->value_string = strndup(":", 1);
                list_add(tokens, token);
            }

            continue;
        }

        if (*c == '"') {
            struct token *token = lex_string(&c);
            if (token == NULL) return NULL; // ошибка: незакрытая строка
            list_add(tokens, token);
            continue;
        }

        if (*c == '=') {
            c++;

            struct token *token = malloc(sizeof(struct token));

            if (token == NULL) {
                return NULL;
            }

            token->type = token_type_assign;
            token->value_string = strndup(c, 1);

            list_add(tokens, token);
            continue;
        }

        printf("Unexpected char: %c\n", *c);
        c++;
    }

    return tokens;
}

struct token *lex_identifier(const char **c) {
    const char *start = *c;

    while (isalnum((unsigned char)**c) || **c == '_') {
        (*c)++;
    }

    size_t len = *c - start;
    char *ident = strndup(start, len);

    enum keyword_type kw = identifier_to_keyword_type(ident);

    struct token *tok = malloc(sizeof(struct token));
    tok->type = TOKEN_TYPE_IDENTIFIER;
    tok->value_string = ident;
    tok->keyword = kw;
    tok->identifier = (kw != keyword_type_none)
                          ? identifier_type_keyword
                          : identifier_type_name;

    return tok;
}

struct token *lex_number(const char **c) {
    const char *start = *c;

    while (isdigit(**c)) {
        (*c)++;
    }

    size_t len = *c - start;
    char *num = strndup(start, len);

    struct token *tok = malloc(sizeof(struct token));
    tok->type = TOKEN_TYPE_INT;
    tok->value_string = num;
    tok->value_int = atoi(num);
    tok->identifier = identifier_type_none;
    tok->keyword = keyword_type_none;

    return tok;
}

struct token *lex_string(const char **c) {
    (*c)++; // пропускаем открывающую кавычку
    const char *start = *c;

    char *buffer = malloc(1024); // временный буфер
    size_t len = 0;

    while (**c && **c != '"') {
        if (**c == '\\') {
            (*c)++;
            if (!**c) break;

            switch (**c) {
                case 'n': buffer[len++] = '\n'; break;
                case 't': buffer[len++] = '\t'; break;
                case '"': buffer[len++] = '"';  break;
                case '\\': buffer[len++] = '\\'; break;
                default: buffer[len++] = **c; break;
            }
        } else {
            buffer[len++] = **c;
        }
        (*c)++;
    }

    if (**c != '"') {
        free(buffer);
        fprintf(stderr, "Unterminated string literal\n");
        return NULL;
    }

    (*c)++; // пропускаем закрывающую кавычку

    buffer[len] = '\0';
    char *final_str = strdup(buffer);
    free(buffer);

    struct token *tok = malloc(sizeof(struct token));
    tok->type = TOKEN_TYPE_STRING;
    tok->identifier = identifier_type_none;
    tok->keyword = keyword_type_none;
    tok->value_string = final_str;

    return tok;
}