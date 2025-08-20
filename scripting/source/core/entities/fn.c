#include <stdlib.h>

#include "core/entities/fn.h"

struct fn *fn_create() {
    struct fn *fn = malloc(sizeof(struct fn));

    return fn;
}
