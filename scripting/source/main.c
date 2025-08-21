#include "common/file.h"

#include "core/lexer.h"
#include "core/parser.h"
#include "core/module.h"
#include "core/interpreter.h"

int main(void) {
    modules_init();

    struct file_info *file = file_load("D:\\Projects\\vecxy\\scripting\\resources\\Main.ms");

    const char *code = file->text;

    struct list* tokens = lex(code);

    if (tokens == NULL) {
        file_free(file);
        file = NULL;

        list_free(tokens, free);
        tokens = NULL;

        return 1;
    }

    //print_tokens(tokens);

    const struct ast_node *ast = parser_parse(tokens);

    return interpret(ast);
}