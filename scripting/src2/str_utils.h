//
// Created by melkov on 20.08.2025.
//

#ifndef SCRIPTING_STR_UTILS_H
#define SCRIPTING_STR_UTILS_H

#include <stddef.h>
#include <stdlib.h>
#include <string.h>

static char *strndup(const char *s, const size_t n) {
    char *p = malloc(n + 1);

    if (p == NULL) {
        return NULL;
    }

    memcpy(p, s, n);

    p[n] = '\0';

    return p;
}

#endif //SCRIPTING_STR_UTILS_H