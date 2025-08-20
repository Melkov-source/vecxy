#ifndef INTERPRETER_H
#define INTERPRETER_H

#include "core/parser.h"
#include "core/module.h"

// --- типы значений ---
enum value_type {
    VAL_INT,
    VAL_STRING
};

struct value {
    enum value_type type;
    int int_value;
    char *string_value;
};

// Главный вызов интерпретатора
int interpret(struct ast_node *program);

#endif // INTERPRETER_H
