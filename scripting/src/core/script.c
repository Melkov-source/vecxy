#include "script.h"

#include "../common/file.h"

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

    return script;
}