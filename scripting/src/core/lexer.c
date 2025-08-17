#include <stdlib.h>
#include <ctype.h>
#include <string.h>

#include "lexer.h"


static int is_keyword(const char *str, size_t len)
{
    return (len == 2 && strncmp(str, "fn", 2) == 0) ||
           (len == 6 && strncmp(str, "return", 6) == 0) ||
           (len == 3 && strncmp(str, "int", 3) == 0);
}

void lex(struct  script *script)
{
    size_t capacity = 10;
    size_t token_count = 0;

    struct token *tokens = malloc(capacity * sizeof(struct token));
    if (!tokens) return;

    const char *pointer = script->source;

    while (*pointer){
        while (isspace(*pointer)) pointer++;
        if (*pointer == '\0') break;

        struct token t;
        t.start = pointer;

        if (isalpha(*pointer) || *pointer == '_'){
            const char *start = pointer;
            while (isalnum(*pointer) || *pointer == '_') pointer++;
            t.length = pointer - start;
            t.type = is_keyword(start, t.length) ? TOKEN_TYPE_KEYWORD : TOKEN_TYPE_IDENTIFIER;
        }
        else if (isdigit(*pointer)){
            const char *start = pointer;
            while (isdigit(*pointer)) pointer++;
            t.length = pointer - start;
            t.type = TOKEN_TYPE_NUMBER;
        }
        else if (*pointer == '(' || *pointer == ')' || *pointer == '{' || *pointer == '}' || *pointer == ';' || *pointer == '=') {
            t.length = 1;
            t.type = TOKEN_TYPE_OPERATOR;
            pointer++;
        }
        else if (*pointer == '"') {
            const char *start = ++pointer;

            while (*pointer && *pointer != '"'){
                if (*pointer == '\\' && *(pointer + 1)) pointer++;
                pointer++;
            }

            t.start = start;
            t.length = pointer - start;
            t.type = TOKEN_TYPE_STRING;

            if (*pointer == '"') pointer++;
        }
        else { pointer++; continue; }

        if (token_count == capacity) {
            capacity *= 2;
            tokens = realloc(tokens, capacity * sizeof(struct token));
            if (!tokens) return;
        }

        tokens[token_count++] = t;
    }

    struct token eof_token = {TOKEN_TYPE_EOF, pointer, 0};

    if (token_count == capacity) {
        capacity *= 2;
        tokens = realloc(tokens, capacity * sizeof(struct token));
        if (!tokens) return;
    }
    tokens[token_count++] = eof_token;

    script->tokens = tokens;
}
