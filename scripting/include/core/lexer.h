#ifndef SCRIPTING_LEXER_H
#define SCRIPTING_LEXER_H

#include "common/list.h"
#include "token.h"

struct list *lex(const char *code);

#endif //SCRIPTING_LEXER_H