#include <stdlib.h>

#include "core/module.h"

#include "modules/console.h"
#include "modules/math.h"

struct list *modules = NULL;

void modules_init()
{
    list_init(modules);

    list_add(modules, console_module_create());
    list_add(modules, math_module_create());

    for (size_t i = 0; i < modules->count; i++)
    {
        struct module *module = list_get(modules, i);

        printf("Module: %s", module->name);
    }
}

struct module *module_create(char *name)
{
    struct module *module = malloc(sizeof(struct module));
    module->name = name;

    list_init(module->exports);

    return module;
}

void module_export_entity_free(struct module_export_entity *export) {
    if(export == NULL) {
        return;
    }
    
    free(export->name);
    free(export);
}

void module_free(struct module *module)
{
    list_free(module->exports, module_export_entity_free);
}