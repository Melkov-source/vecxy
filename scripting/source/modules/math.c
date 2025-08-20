#include "modules/math.h"

int abc(int a) {
    if (a >= 0) {
        return a;
    }

    return a * -1;
}

struct module *math_module_create()
{
    struct module *module = module_create("Math");

    /*const size_t size = sizeof(struct module_export_entity);

    struct module_export_entity *abc_export_fn = malloc(size);
    abc_export_fn->name = "Abc";
    abc_export_fn->p = abc_export_fn;
    list_add(module->exports, abc_export_fn);*/

    return module;
}