#ifndef SCRIPTING_SCRIPT_H
#define SCRIPTING_SCRIPT_H

struct script {
    char *source;
    const struct token *tokens;
};

struct script *script_create(const char *path);
#endif //SCRIPTING_SCRIPT_H
