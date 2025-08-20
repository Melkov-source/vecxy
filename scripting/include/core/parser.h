#ifndef SCRIPTING_PARSER_H
#define SCRIPTING_PARSER_H

#include "core/ast.h"

struct parser {
    const struct list *tokens;
    const struct ast_node *ast;
    size_t index;
};

const struct ast_node *parser_parse(const struct list *tokens);

#endif // SCRIPTING_PARSER_H
