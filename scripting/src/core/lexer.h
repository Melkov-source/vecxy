#ifndef SCRIPTING_LEXER_H
#define SCRIPTING_LEXER_H

#include "token.h"

struct token *lexer_start_process(const char *script);

#endif //SCRIPTING_LEXER_H
