#include "modules/console.h"

void console_log(char *text)
{
    printf("[LOG] %s", text);
}

void console_warn(char *text)
{
    printf("[WARN] %s", text);
}

void console_error(char *text)
{
    printf("[ERROR] %s", text);
}

struct module *console_module_create()
{
    struct module *module = module_create("Console");

    size_t size = sizeof(struct module_export_entity);

    struct module_export_entity *log = malloc(size);
    log->name = "Log";
    log->p = console_log;
    list_add(module->exports, log);

    struct module_export_entity *error = malloc(size);
    error->name = "Error";
    error->p = console_error;
    list_add(module->exports, error);

    struct module_export_entity *warn = malloc(size);
    warn->name = "Warm";
    warn->p = console_warn;
    list_add(module->exports, warn);

    return module;
}