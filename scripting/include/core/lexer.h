//
// Created by melkov on 20.08.2025.
//

#ifndef SCRIPTING_LEXER_H
#define SCRIPTING_LEXER_H

#include "list.h"
#include "token.h"

struct list *lex(const char *code);

#endif //SCRIPTING_LEXER_H