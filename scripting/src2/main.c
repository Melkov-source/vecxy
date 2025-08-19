#include <assert.h>
#include <ctype.h>
#include <stdbool.h>
#include <stdio.h>
#include <string.h>

#include "file.h"
#include "list.h"

struct list *lex(const char *code);

enum token_type {
    TOKEN_TYPE_NONE = 0,
    TOKEN_TYPE_IDENTIFIER,

    TOKEN_TYPE_HASH,
    TOKEN_TYPE_TO,

    TOKEN_TYPE_LBRACKET,
    TOKEN_TYPE_RBRACKET,
    TOKEN_TYPE_LBRACE,
    TOKEN_TYPE_RBRACE,

    TOKEN_TYPE_INT,
    TOKEN_TYPE_FLOAT,
    TOKEN_TYPE_STRING,
    TOKEN_TYPE_BOOL,

    token_type_assign,

    token_type_semicolon,
    token_type_comma,
};

enum identifier_type {
    identifier_type_none = 0,

    identifier_type_name,
    identifier_type_keyword,
};

enum keyword_type {
    keyword_type_none = 0,

    keyword_type_main,
    keyword_type_fn,
    keyword_type_return,

    keyword_type_int,
    keyword_type_float,
    keyword_type_string,
    keyword_type_null,

    keyword_type_import,
    keyword_type_export,

    keyword_type_pack,
    keyword_type_mix,
    keyword_type_kind,

    keyword_type_new,
    keyword_type_ctor,
    keyword_type_lock,

    keyword_type_public,
    keyword_type_private,
    keyword_type_protected,
    keyword_type_static,
    keyword_type_const,

    keyword_type_add,
    keyword_type_is,
    keyword_type_to,
    keyword_type_of,

    keyword_type_for,
    keyword_type_while,
    keyword_type_do,

    keyword_type_break,
    keyword_type_continue,
};

struct token {
    enum token_type type;
    enum identifier_type identifier;
    enum keyword_type keyword;

    char *value_string;
    int value_int;
    float value_float;
    bool value_bool;
};

enum keyword_type lex_keyword_identifier(const char *ident) {
    if (strcmp(ident, "main") == 0) return keyword_type_main;
    if (strcmp(ident, "fn") == 0) return keyword_type_fn;
    if (strcmp(ident, "return") == 0) return keyword_type_return;

    if (strcmp(ident, "int") == 0) return keyword_type_int;
    if (strcmp(ident, "float") == 0) return keyword_type_float;
    if (strcmp(ident, "string") == 0) return keyword_type_string;
    if (strcmp(ident, "null") == 0) return keyword_type_null;

    if (strcmp(ident, "import") == 0) return keyword_type_import;
    if (strcmp(ident, "export") == 0) return keyword_type_export;

    if (strcmp(ident, "pack") == 0) return keyword_type_pack;
    if (strcmp(ident, "mix") == 0) return keyword_type_mix;
    if (strcmp(ident, "kind") == 0) return keyword_type_kind;

    if (strcmp(ident, "new") == 0) return keyword_type_new;
    if (strcmp(ident, "ctor") == 0) return keyword_type_ctor;
    if (strcmp(ident, "lock") == 0) return keyword_type_lock;

    if (strcmp(ident, "public") == 0) return keyword_type_public;
    if (strcmp(ident, "private") == 0) return keyword_type_private;
    if (strcmp(ident, "protected") == 0) return keyword_type_protected;
    if (strcmp(ident, "static") == 0) return keyword_type_static;
    if (strcmp(ident, "const") == 0) return keyword_type_const;

    if (strcmp(ident, "add") == 0) return keyword_type_add;
    if (strcmp(ident, "is") == 0) return keyword_type_is;
    if (strcmp(ident, "to") == 0) return keyword_type_to;
    if (strcmp(ident, "of") == 0) return keyword_type_of;

    if (strcmp(ident, "for") == 0) return keyword_type_for;
    if (strcmp(ident, "while") == 0) return keyword_type_while;
    if (strcmp(ident, "do") == 0) return keyword_type_do;

    if (strcmp(ident, "break") == 0) return keyword_type_break;
    if (strcmp(ident, "continue") == 0) return keyword_type_continue;

    return keyword_type_none;
}

void print_tokens(struct list **tok) {
    struct  list *tokens = *tok;

    for (size_t i = 0; i < tokens->count; i++) {
        const struct token *token = list_get(tokens, i);

        printf("Token %zu: ", i);

        switch (token->type) {
            case TOKEN_TYPE_IDENTIFIER:
                printf("IDENTIFIER (%s)", token->value_string);
                if (token->identifier == identifier_type_keyword) {
                    printf(" [keyword]");
                }
                break;

            case TOKEN_TYPE_HASH:
                printf("HASH (#)");
                break;

            case TOKEN_TYPE_TO:
                printf("TO (::)");
                break;

            case TOKEN_TYPE_LBRACKET:
                printf("LBRACKET (%s)", token->value_string);
                break;

            case TOKEN_TYPE_RBRACKET:
                printf("RBRACKET (%s)", token->value_string);
                break;

            case TOKEN_TYPE_LBRACE:
                printf("LBRACE (%s)", token->value_string);
                break;

            case TOKEN_TYPE_RBRACE:
                printf("RBRACE (%s)", token->value_string);
                break;

            case TOKEN_TYPE_INT:
                printf("INT (%d)", token->value_int);
                break;

            case token_type_semicolon:
                printf("SEMICOLON (;)");
                break;

            case token_type_comma:
                printf("COMMA (,)");
                break;

            default:
                printf("UNKNOWN (%s)", token->value_string ? token->value_string : "null");
                break;
        }

        printf("\n");
    }
}

int main(void) {
    const struct file_info *file = file_load("E:\\Projects\\vecxy\\scripting\\temp\\scripts\\main.ms");

    char *code = file->text;

    struct list* tokens = lex(code);

    if (tokens == NULL) {
        return 1;
    }

    print_tokens(&tokens);

    return 0;
}


static char *strndup(const char *s, size_t n) {
    char *p = malloc(n + 1);
    if (!p) return NULL;
    memcpy(p, s, n);
    p[n] = '\0';
    return p;
}

struct token *lex_identifier(const char **c) {
    const char *start = *c;

    while (isalnum((unsigned char)**c) || **c == '_') {
        (*c)++;
    }

    size_t len = *c - start;
    char *ident = strndup(start, len);

    enum keyword_type kw = lex_keyword_identifier(ident);

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
            }
            continue;
        }

        printf("Unexpected char: %c\n", *c);
        c++;
    }

    return tokens;
}

