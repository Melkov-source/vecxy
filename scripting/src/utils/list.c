#include "list.h"

void list_default(struct list *list) {
    list->head = NULL;
    list->tail = NULL;
    list->count = 0;
}

void list_init(struct list *list) {
    list_default(list);
}

void list_add(struct list *list, void *data) {
    const size_t list_node_size = sizeof(struct list_node);

    struct list_node *node = malloc(list_node_size);

    node->data = data;
    node->next = NULL;

    if (list->head == NULL) {
        list->head = node;
        list->tail = node;
    } else {
        list->tail->next = node;
        list->tail = node;
    }

    list->count++;
}

void list_free(struct list *list, void(*free_data)(void *)) {
    struct list_node *current = list->head;

    while (current != NULL) {
        struct list_node *next = current->next;

        if (free_data != NULL) {
            free_data(current->data);
        }

        free(current);

        current = next;
    }

    list_default(list);
}
