#include "core/ast.h"
#include "core/parser.h"

struct ast_node *ast_node_create(const enum ast_node_type type) {
    struct ast_node *node = calloc(1, sizeof(struct ast_node));

    node->children = malloc(sizeof(struct list));
    node->type = type;

    list_init(node->children);

    return node;
}

void ast_node_free(struct ast_node *node) {
    if (node == NULL) {
        return;
    }

    for (const struct list_node *current = node->children->head; current; current = current->next) {
        ast_node_free(current->data);
    }

    free(node);
}