#ifndef SCRIPTING_VAR_H
#define SCRIPTING_VAR_H

enum var_type
{
    VAR_TYPE_UNDEFINED,

    VAR_TYPE_INT,
    VAR_TYPE_FLOAT,
    VAR_TYPE_STRING,
    VAR_TYPE_CHAR,
    VAR_TYPE_BOOL,

    VAR_TYPE_PACK
};

union var_value
{
    int i;
    float f;
    char c;
    int b;
    char *s;

    struct pack *pack;
};

struct var
{
    char *name;
    enum var_type type;
    union var_value value;
};


#endif //SCRIPTING_VAR_H
