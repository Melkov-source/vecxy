#include "token.h"

#ifndef SCRIPTING_LEXER_H
#define SCRIPTING_LEXER_H

enum token_type {
    TOKEN_TYPE_NONE = 0,
    TOKEN_TYPE_KEYWORD,
};

static struct token *lexer_start_process(char *script);

#endif //SCRIPTING_LEXER_H
