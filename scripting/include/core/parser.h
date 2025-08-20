#ifndef SCRIPTING_PARSER_H
#define SCRIPTING_PARSER_H

#include "core/ast.h"

struct parser_state {
    const struct list *tokens;
    size_t index;
};

struct ast_node *parse(const struct list *tokens);

#endif // SCRIPTING_PARSER_H
