#include <stdlib.h>

#include "core/module.h"

#include <stdio.h>

#include "modules/console.h"
#include "modules/math.h"

struct list *modules = NULL;

void modules_init()
{
    modules = malloc(sizeof(struct list));
    list_init(modules);

    list_add(modules, console_module_create());
    list_add(modules, math_module_create());
}

struct module *module_create(char *name)
{
    struct module *module = malloc(sizeof(struct module));
    module->name = name;

    module->exports = malloc(sizeof(struct list));
    list_init(module->exports);

    return module;
}

void module_free(struct module *module)
{
    list_free(module->exports, free);
}