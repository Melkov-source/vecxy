#include "token.h"
#include <stdio.h>
#include <stdlib.h>
#include <ctype.h>
#include <string.h>

static int is_keyword(const char *str, size_t len) {
    return (len == 2 && strncmp(str, "fn", 2) == 0) ||
           (len == 6 && strncmp(str, "return", 6) == 0);
}

struct token *lexer_start_process(const char *script) {
    size_t capacity = 10;
    size_t token_count = 0;
    struct token *tokens = malloc(capacity * sizeof(struct token));
    if (!tokens) return NULL;

    const char *p = script;

    while (*p) {
        while (isspace(*p)) p++;
        if (*p == '\0') break;

        struct token t;
        t.start = p;

        if (isalpha(*p) || *p == '_') {
            const char *start = p;
            while (isalnum(*p) || *p == '_') p++;
            t.length = p - start;
            t.type = is_keyword(start, t.length) ? TOKEN_TYPE_KEYWORD : TOKEN_TYPE_IDENTIFIER;
        } else if (isdigit(*p)) {
            const char *start = p;
            while (isdigit(*p)) p++;
            t.length = p - start;
            t.type = TOKEN_TYPE_NUMBER;
        } else if (*p == '(' || *p == ')' || *p == '{' || *p == '}' || *p == ';') {
            t.length = 1;
            t.type = TOKEN_TYPE_OPERATOR;
            p++;
        } else if (*p == '"') {
            const char *start = ++p;
            while (*p && *p != '"') {
                if (*p == '\\' && *(p + 1)) p++; // пропускаем экранированный символ
                p++;
            }
            t.start = start;
            t.length = p - start;
            t.type = TOKEN_TYPE_STRING;
            if (*p == '"') p++;
        } else {
            p++;
            continue;
        }

        if (token_count == capacity) {
            capacity *= 2;
            tokens = realloc(tokens, capacity * sizeof(struct token));
            if (!tokens) return NULL;
        }

        tokens[token_count++] = t;
    }

    struct token eof_token = {TOKEN_TYPE_EOF, p, 0};
    if (token_count == capacity) {
        capacity *= 2;
        tokens = realloc(tokens, capacity * sizeof(struct token));
        if (!tokens) return NULL;
    }
    tokens[token_count++] = eof_token;

    return tokens;
}
