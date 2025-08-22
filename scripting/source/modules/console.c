#include "modules/console.h"
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#include "../../include/core/scope.h"

static void console_log(const struct scope *scope, const struct ast_node *ast) {
    if (ast->children->count > 0) {
        const struct ast_node *parameter = ast->children->head->data;

        switch (parameter->type) {
            case AST_NODE_TYPE_STRING: {
                printf("%s\n", parameter->string_value);
                break;
            }

            case AST_NODE_TYPE_NUMBER: {
                printf("%d\n", parameter->int_value);
                break;
            }

            case AST_NODE_TYPE_VAR_REF: {
                const struct  var *var = scope_get_var(scope, parameter->name);

                if (var->type == VAR_TYPE_INT) {
                    printf("%d\n", var->value->i);
                } else if (var->type == VAR_TYPE_STRING) {
                    printf("%s\n", var->value->s);
                }
                break;
            }

            default:
                printf("[Console.Log: unsupported arg]\n");
                break;
        }
    }
}

struct module *console_module_create() {
    struct module *m = module_create("Console");

    struct module_export_entity *logFn = malloc(sizeof(*logFn));
    logFn->name = strdup("Log");
    logFn->func = console_log;

    list_add(m->exports, logFn);
    return m;
}
