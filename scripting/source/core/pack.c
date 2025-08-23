#include "core/pack.h"
#include "core/scope.h"
#include "collections/list.h"

struct pack *pack_create(char *name, struct scope *scope_parent)
{
    struct scope *pack_scope = scope_create(scope_parent);

    struct pack *pack = malloc(sizeof(struct pack));
    pack->name = name;
    pack->scope = pack_scope;
    list_init(pack->members);

    return pack;
}

void pack_add_field(struct pack *pack, struct field_member *field)
{
    list_add(pack->members, field);
}

void pack_add_fn(struct pack *pack, struct fn_member *field)
{
    list_add(pack->members, field);
}
