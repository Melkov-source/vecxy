#include "script.h"

#include "../common/file.h"
#include "../core/lexer.h"

struct script * script_create(const char *path) {
    const struct file_info *file = file_load(path);

    if (file == NULL) {
        return NULL;
    }

    struct script *script = malloc(sizeof(struct script));

    if (script == NULL) {
        return NULL;
    }

    script->source = file->text;

    const struct token *tokens = lexer_start_process(script->source);

    script->tokens = tokens;

    return script;
}