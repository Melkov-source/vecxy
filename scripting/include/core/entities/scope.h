#ifndef SCRIPTING_SCOPE_H
#define SCRIPTING_SCOPE_H

struct pack;

struct scope
{
    struct scope *parent;
    struct pack *packs;
};

struct scope *scope_create(struct scope *parent);

#endif // SCRIPTING_SCOPE_H