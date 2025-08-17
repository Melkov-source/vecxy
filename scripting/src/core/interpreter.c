#include <string.h>
#include <stdio.h>

#include "interpreter.h"
#include "parser.h"


int execute_node(struct node *n) {
    while (n) {
        switch (n->type) {
            case NODE_TYPE_CALL:
                if (strcmp(n->name, "log") == 0 && n->child && n->child->type == NODE_TYPE_STRING) {
                    printf("%s\n", n->child->str);
                }
                break;

            case NODE_TYPE_RETURN:
                if (n->child && n->child->type == NODE_TYPE_NUMBER) {
                    return n->child->value;
                }
                break;

            default:
                break;
        }
        n = n->next;
    }
    return 0;
}

int interpreter_execute(const struct script *script) {
    struct node *main_func = parse_tokens(script->tokens);
    if (!main_func) return 0;

    int result = execute_node(main_func->child);

    printf("Script returned: %d\n", result);
    return result;
}
