#include "lexer.h"

#include <stdlib.h>

static struct token *lexer_start_process(char *script) {
    const size_t token_size = sizeof(struct token);

    struct token *token = malloc(token_size);

    if (token == NULL) {
        return NULL;
    }

    return token;
}
