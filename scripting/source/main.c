#include <stdio.h>

#include "io/file.h"

#include "core/lexer.h"
#include "core/parser.h"
#include "core/module.h"
#include "core/interpreter.h"

#include "string.h"

int main(void) {
    modules_init();

    struct string path = string_create(20);
    string_set(&path, "E:\\Projects\\vecxy\\scripting\\resources\\Main.ms", 50);

    struct file_info *file = file_load(path.value);

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

    const struct ast_node *ast = parser_parse(tokens);

    printf("%s", interpret(ast)->s);

    return 0;
}