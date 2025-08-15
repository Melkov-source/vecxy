#include <stdio.h>

#include "utils/list.h"

void print_list(const struct list *list);

int main(void) {
    /*char *script = "fn main(){}";

    struct list tokens;
    list_init(&tokens);

    struct token *token = lexer_start_process(script);

    list_add(&tokens, &token);

    printf("Hello World\n");*/

    struct list numbers;
    list_init(&numbers);

    int *new_number = malloc(sizeof(int));
    *new_number = 10;

    list_add(&numbers, new_number);
    print_list(&numbers);
    print_list(&numbers);

    return 0;
}

void print_list(const struct list *list) {
    const struct list_node *current = list->head;

    int index = 0;

    while (current != NULL) {
        const struct list_node *next = current->next;

        printf("Number[%d]: %d\n", index, *(int*)current->data);

        current = next;

        index++;
    }

}
