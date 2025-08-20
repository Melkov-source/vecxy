//
// Created by melkov on 20.08.2025.
//

#ifndef SCRIPTING_AST_H
#define SCRIPTING_AST_H

#include "common/list.h"

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

    int int_value;
    float float_value;
    char *string_value;

    struct list children;
};

#endif //SCRIPTING_AST_H