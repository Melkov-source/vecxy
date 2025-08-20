#include "modules/console.h"
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#include "core/parser.h"

static void console_log(struct node *callNode) {
    if (callNode->children.count > 0) {
        struct node *arg = callNode->children.head->data;
        if (arg->type == NODE_STRING) {
            printf("%s\n", arg->string_value);
        } else if (arg->type == NODE_NUMBER) {
            printf("%d\n", arg->int_value);
        } else {
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
