#ifndef SCRIPTING_FILE_H
#define SCRIPTING_FILE_H

#include <stdlib.h>

struct file_info {
    char *name;
    char *text;
    size_t size;
    char *ext;
};

struct file_info *file_load(const char *path);

void file_free(struct file_info *file);

#endif // SCRIPTING_FILE_H
