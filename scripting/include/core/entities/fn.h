#ifndef SCRIPTING_FN_H
#define SCRIPTING_FN_H

#include "var.h"

struct fn {
    char *name;
    struct var *parameters;
    enum var_type return_type;

    struct scope *scope;
};

struct fn *fn_create();

#endif // SCRIPTING_FN_H
