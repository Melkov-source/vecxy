#ifndef SCRIPTING_LIST_H
#define SCRIPTING_LIST_H

#include <stdlib.h>

struct list {
    struct list_node *head;
    struct list_node *tail;
    size_t count;
};

struct list_node {
    void *data;
    struct list_node *next;
};

struct list *list_create();

void list_init(struct list *list);

void list_add(struct list *list, void *data);

void *list_get(struct list *list, size_t index);

void list_free(struct list *list, void (*free_data)(void *));

#endif //SCRIPTING_LIST_H
