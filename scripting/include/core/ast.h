#ifndef SCRIPTING_AST_H
#define SCRIPTING_AST_H

#include "common/list.h"

enum ast_node_type {
    AST_NODE_TYPE_PROGRAM,
    AST_NODE_TYPE_IMPORT,
    AST_NODE_TYPE_IMPORT_MODULE,
    AST_NODE_TYPE_CALL_MODULE,
    AST_NODE_TYPE_FUNCTION,
    AST_NODE_TYPE_RETURN,
    AST_NODE_TYPE_VAR_DECL,
    AST_NODE_TYPE_CALL,
    AST_NODE_TYPE_IF,
    AST_NODE_TYPE_BLOCK,
    AST_NODE_TYPE_NUMBER,
    AST_NODE_TYPE_STRING,
    AST_NODE_TYPE_VAR_REF,
    AST_NODE_TYPE_EMPTY
};

struct ast_node {
    enum ast_node_type type;
    char *name;
    char *return_type;

    int int_value;
    float float_value;
    char *string_value;

    struct list children;
};

struct ast_node *ast_node_create(enum ast_node_type type);
void ast_node_free(struct ast_node *node);

#endif //SCRIPTING_AST_H