#ifndef SCRIPTING_TOKEN_H
#define SCRIPTING_TOKEN_H
#include <stdlib.h>

enum token_type {
    TOKEN_TYPE_KEYWORD,
    TOKEN_TYPE_IDENTIFIER,
    TOKEN_TYPE_NUMBER,
    TOKEN_TYPE_STRING,
    TOKEN_TYPE_OPERATOR,
    TOKEN_TYPE_EOF
};

struct token {
    enum token_type type;
    const char *start;
    size_t length;
};

#endif //SCRIPTING_TOKEN_H