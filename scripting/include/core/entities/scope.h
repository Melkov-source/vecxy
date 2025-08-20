#ifndef SCRIPTING_SCOPE_H
#define SCRIPTING_SCOPE_H

struct pack;
struct var;

struct scope
{
    struct scope *parent;
    struct list *packs;
    struct list *functions;
    struct list *variables;
    struct list *modules;
};

struct scope *scope_create(struct scope *parent);

#endif // SCRIPTING_SCOPE_H