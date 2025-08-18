#include <string.h>
#include <stdio.h>

#include "interpreter.h"
#include "parser.h"
#include "lexer.h"

void execute_node_function(const struct node *node) {
    if (strcmp(node->name, "log") == 0 && node->child && node->child->type == NODE_TYPE_STRING) {
        printf("%s\n", node->child->str);
    }
}

int execute_node(const struct node *node) {
    while (node) {
        switch (node->type) {
            case NODE_TYPE_CALL:
                execute_node_function(node);
                break;
            case NODE_TYPE_RETURN:
                if (node->child && node->child->type == NODE_TYPE_NUMBER) {
                    return node->child->value;
                }
                break;
            default: break;
        }
        node = node->next;
    }
    return 0;
}

int interpreter_execute(const struct script *script) {
    lex2(script);

    struct node *main_func = parse_tokens(script);

    if (!main_func) return 0;

    int result = execute_node(main_func->child);

    printf("Script returned: %d\n", result);

    return result;
}
