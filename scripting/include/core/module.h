#ifndef SCRIPTING_MODULE_H
#define SCRIPTING_MODULE_H

#include "common/list.h"
#include "core/parser.h"

extern struct list *modules;

struct module_export_entity {
    char *name;

    void (*func)(struct scope *scope, struct ast_node *callNode);
};

struct module_config {
    int version;
    void *table;
};

struct module {
    char *name;
    struct list *exports;
};

struct module *module_create(char *name);

void module_free(struct module *module);

void modules_init();

#endif // SCRIPTING_MODULE_H
