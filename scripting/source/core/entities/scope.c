#include "core/entities/scope.h"

#include <string.h>

#include "common/list.h"
#include "core/entities/fn.h"

struct var *scope_get_var(const struct scope *scope, const char *var_name) {
    for (int index = 0; index < scope->variables->count; index++) {
        struct var *var = list_get(scope->variables, index);

        if (strcmp(var->name, var_name) == 0) {
            return var;
        }
    }

    if (scope->parent != NULL) {
        struct var *prnt_var = scope_get_var(scope->parent, var_name);

        return prnt_var;
    }

    return NULL;
}

struct fn *scope_get_fn(const struct scope *scope, const char *fn_name) {
    for (int index = 0; index < scope->functions->count; index++) {
        struct fn *fn = list_get(scope->functions, index);

        if (strcmp(fn->name, fn_name) == 0) {
            return fn;
        }
    }

    if (scope->parent != NULL) {
        return scope_get_fn(scope->parent, fn_name);
    }

    return NULL;
}

struct scope *scope_create(struct scope *parent) {
    struct scope *scope = malloc(sizeof(struct scope));

    scope->parent = parent;
    scope->functions = list_create();
    scope->variables = list_create();
    scope->packs = list_create();
    scope->modules = list_create();


    return scope;
}

void scope_free(struct scope *scope) {
    list_free(scope->functions, free);
    list_free(scope->variables, free);
    list_free(scope->packs, free);
    list_free(scope->modules, free);

    free(scope);
}
