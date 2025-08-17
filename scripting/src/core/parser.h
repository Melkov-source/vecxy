#ifndef SCRIPTING_PARSER_H
#define SCRIPTING_PARSER_H

#include "token.h"
#include "ast.h"
#include "script.h"

struct node *parse_tokens(struct script *script);

#endif //SCRIPTING_PARSER_H
