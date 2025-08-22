#ifndef SCRIPTING_SCOPE_H
#define SCRIPTING_SCOPE_H
#include "core/ast.h"

struct pack;
struct var;

struct scope
{
    struct scope *parent;
    struct list *packs;
    struct list *functions;
    struct list *variables;
    struct list *modules;

    const struct ast_node *ast;
};

struct var *scope_get_var(const struct scope *scope, const char *var_name);
struct  fn *scope_get_fn(const struct scope *scope, const char *fn_name);

struct scope *scope_create(struct scope *parent);
void scope_free(struct scope *scope);

#endif // SCRIPTING_SCOPE_H