//
// Created by melkov on 17.08.2025.
//

#ifndef SCRIPTING_AST_H
#define SCRIPTING_AST_H

enum node_type {
    NODE_TYPE_FUNCTION,
    NODE_TYPE_RETURN,
    NODE_TYPE_NUMBER,
    NODE_TYPE_CALL,
    NODE_TYPE_STRING
};

struct node {
    enum node_type type;
    char *name;
    int value;
    char *str;
    struct node *child;
    struct node *next;
};

#endif //SCRIPTING_AST_H
