#include <stdlib.h>

#include "core/entities/fn.h"

#include <stdio.h>
#include <string.h>

#include "core/ast.h"
#include "core/module.h"
#include "core/entities/scope.h"

static union var_value *fn_return_value(const struct fn *fn, const struct ast_node *n) {
    union var_value *result = malloc(sizeof(*result));

    switch (n->type) {
        case AST_NODE_TYPE_NUMBER:
            result->i = n->int_value;
            break;
        case AST_NODE_TYPE_STRING:
            result->s = n->string_value;
            break;
        case AST_NODE_TYPE_VAR_REF: {
            const struct var *var = scope_get_var(fn->scope, n->name);

            result->pack = var->value->pack;
            break;
        }

        default:
            fprintf(stderr, "Runtime error: unknown expression node\n");
            exit(1);
    }

    return result;
}

struct var *fn_invoke(const struct fn *fn) {
    struct var *result = malloc(sizeof(struct var));
    result->name = "__fn_result";
    result->type = fn->return_type;

    for (const struct list_node *current = fn->ast->children->head; current; current = current->next) {
        const struct ast_node *ast = current->data;

        switch (ast->type) {
            case AST_NODE_TYPE_RETURN: {
                result->value = fn_return_value(fn, ast->children->head->data);
                return result;
            }

            case AST_NODE_TYPE_CALL: {
                const struct fn *fn_call = scope_get_fn(fn->scope, ast->name);

                fn_invoke(fn_call);
                break;
            }

            case AST_NODE_TYPE_CALL_MODULE: {
                struct ast_node *callNode = ast->children->head->data;

                const char *fn_name = callNode->name;

                for (size_t i = 0; i < modules->count; i++) {
                    const struct module *m = list_get(modules, i);

                    if (strcmp(m->name, ast->string_value) == 0) {
                        for (size_t j = 0; j < m->exports->count; j++) {
                            const struct module_export_entity *exp = list_get(m->exports, j);

                            if (strcmp(exp->name, fn_name) == 0) {
                                exp->func(callNode);
                            }
                        }
                    }
                }
            }
            default:
                break;
        }
    }

    return result;
}

struct fn *fn_create(const struct scope *fn_scope, struct ast_node *ast) {
    if (ast->type != AST_NODE_TYPE_FUNCTION) {
        return NULL;
    }
    struct fn *fn = malloc(sizeof(struct fn));

    fn->name = ast->name;
    fn->ast = ast;
    fn->scope = fn_scope;

    return fn;
}
