#include <stdlib.h>
#include "module.h"

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