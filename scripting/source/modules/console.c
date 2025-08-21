#include "modules/console.h"
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#include "core/parser.h"
#include "core/entities/scope.h"

static void console_log(struct scope *scope, struct ast_node *callNode) {
    if (callNode->children->count > 0) {
        struct ast_node *arg = callNode->children->head->data;
        if (arg->type == AST_NODE_TYPE_STRING) {
            printf("%s\n", arg->string_value);
        } else if (arg->type == AST_NODE_TYPE_NUMBER) {
            printf("%d\n", arg->int_value);
        } else if (arg->type == AST_NODE_TYPE_VAR_REF) {
            const struct  var *var = scope_get_var(scope, arg->name);

            if (var->type == VAR_TYPE_INT) {
                printf("%d\n", var->value->i);
            } else if (var->type == VAR_TYPE_STRING) {
                printf("%s\n", var->value->s);
            }
        }else {
            printf("[Console.Log: unsupported arg]\n");
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
