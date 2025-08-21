#include "core/interpreter.h"
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#include "core/entities/scope.h"
#include "core/entities/fn.h"

static void initialize_global_scope(struct scope *g_scope) {
    for (const struct list_node *current = g_scope->ast->children->head; current; current = current->next) {
        struct ast_node *n = current->data;

        if (n->type == AST_NODE_TYPE_FUNCTION) {
            struct scope *fn_scope = scope_create(g_scope);
            struct fn *fn = fn_create(fn_scope,  n);

            list_add(g_scope->functions, fn);
        }
    }
}

union var_value *interpret(const struct ast_node *program) {
    struct scope *g_scope = scope_create(NULL);
    g_scope->ast = program;
    initialize_global_scope(g_scope);

    const struct fn *main = scope_get_fn(g_scope, "Main");

    if (main == NULL) {
        fprintf(stderr, "Runtime error: No fn::int Main(...) function\n");
        union var_value *var = malloc(sizeof(union var_value));
        var->i = 1;

        return var;
    }

    const struct var *result = fn_invoke(main);

    scope_free(g_scope);

    return result->value;
}
