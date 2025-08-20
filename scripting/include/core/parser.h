#ifndef SCRIPTING_PARSER_H
#define SCRIPTING_PARSER_H

#include "parser_utils.h"
#include "core/ast.h"


struct node *parse(const struct list *tokens);
void free_node(struct node *n);

#endif // SCRIPTING_PARSER_H
