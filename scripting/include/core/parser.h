#ifndef SCRIPTING_PARSER_H
#define SCRIPTING_PARSER_H

#include "common/list.h"
#include "core/token.h"

enum node_type {
    NODE_PROGRAM,
    NODE_IMPORT,
    NODE_IMPORT_MODULE,
    NODE_CALL_MODULE,
    NODE_FUNCTION,
    NODE_RETURN,
    NODE_VAR_DECL,
    NODE_CALL,
    NODE_IF,
    NODE_BLOCK,
    NODE_NUMBER,
    NODE_STRING,
    NODE_VAR_REF,
    NODE_EMPTY
};

struct node {
    enum node_type type;
    char *name;
    char *return_type;

    // значения
    int int_value;
    float float_value;
    char *string_value;

    // потомки
    struct list children;
};

struct node *parse(const struct list *tokens);
void free_node(struct node *n);

#endif // SCRIPTING_PARSER_H
