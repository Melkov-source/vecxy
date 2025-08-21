#include "core/entities/scope.h"

#include "common/list.h"
#include "core/entities/fn.h"

const struct var *scope_get_var(const struct scope *scope, const char *var_name) {
    for (int index = 0; index < scope->variables->count; index++) {
        const struct var *var = list_get(scope->variables, index);

        if (*var->name == *var_name) {
            return var;
        }
    }

    if (scope->parent != NULL) {
        const struct var *prnt_var = scope_get_var(scope->parent, var_name);

        return prnt_var;
    }

    return NULL;
}

const struct fn *scope_get_fn(const struct scope *scope, const char *fn_name) {
    for (int index = 0; index < scope->functions->count; index++) {
        const struct fn *fn = list_get(scope->functions, index);

        if (*fn->name == *fn_name) {
            return fn;
        }
    }

    if (scope->parent != NULL) {
        const struct fn *prnt_fn = scope_get_fn(scope->parent, fn_name);

        return prnt_fn;
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
