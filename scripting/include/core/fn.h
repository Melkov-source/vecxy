#ifndef SCRIPTING_FN_H
#define SCRIPTING_FN_H

#include "core/var.h"
#include "collections/list.h"

struct fn {
    const char *name;
    struct list *parameters;
    enum var_type return_type;
    struct ast_node *ast;

    const struct scope *scope;
};


struct var *fn_invoke(const struct fn *fn);
struct fn *fn_create(const struct scope *fn_scope, struct ast_node *ast);

#endif // SCRIPTING_FN_H
