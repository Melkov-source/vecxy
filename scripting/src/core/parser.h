#ifndef SCRIPTING_PARSER_H
#define SCRIPTING_PARSER_H

#include "token.h"
#include "ast.h"

struct node *parse_tokens(const struct token *tokens);

#endif //SCRIPTING_PARSER_H