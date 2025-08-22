#ifndef SCRIPTING_ENVIRONMENT_H
#define SCRIPTING_ENVIRONMENT_H

#include "core/scope.h"

struct environment {
    struct scope *scope;
};

#endif //SCRIPTING_ENVIRONMENT_H