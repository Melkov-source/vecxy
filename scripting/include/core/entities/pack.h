#ifndef SCRIPTING_PACK_H
#define SCRIPTING_PACK_H

#include <stdlib.h>

struct scope;

enum member_modificator_type
{
    PRIVATE,
    PUBLIC,
    PROTECTED,
    STATIC
};

struct pack
{
    struct scope *scope;

    char *name;
    struct list *members;
};

struct member 
{
    enum member_modificator_type modificator_type;
};

struct field_member
{
    struct member *base;
    struct var *var;
};

struct fn_member
{
    struct member *base;
    struct fn *fn;
};

struct pack *pack_create(char *name, struct scope *scope_parent);
struct field_member *pack_field_memeber_create();

void pack_add_field(struct pack *pack, struct field_member *field);
void pack_add_fn(struct pack *pack, struct fn_member *field);

#endif // SCRIPTING_PACK_H