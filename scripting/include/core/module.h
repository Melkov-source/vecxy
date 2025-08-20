#ifndef SCRIPTING_MODULE_H
#define SCRIPTING_MODULE_H

#include "list.h"

struct module_export_entity
{
    char *name;
    void *p;
};

struct module_config
{
    int version;
    void *table;
};

struct module
{
    char *name;
    struct list *exports;
};

struct module *module_create(char *name);
void module_free(struct module *module);
void modules_init();

#endif // SCRIPTING_MODULE_H