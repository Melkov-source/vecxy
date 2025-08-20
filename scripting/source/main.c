#include "file.h"
#include "lexer.h"
#include "parser.h"

int main(void) {
    struct file_info *file = file_load("E:\\Projects\\vecxy\\scripting\\resources\\main.ms");

    const char *code = file->text;

    struct list* tokens = lex(code);

    if (tokens == NULL) {
        file_free(file);
        file = NULL;

        list_free(tokens, free);
        tokens = NULL;

        return 1;
    }

    print_tokens(tokens);

    struct node *ast = parse(tokens);

    return 0;
}