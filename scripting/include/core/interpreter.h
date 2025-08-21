#ifndef INTERPRETER_H
#define INTERPRETER_H

#include "core/parser.h"
#include "core/module.h"

union var_value *interpret(const struct ast_node *program);

#endif // INTERPRETER_H
