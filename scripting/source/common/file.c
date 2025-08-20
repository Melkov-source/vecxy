#include "file.h"
#include <stdio.h>
#include <string.h>
#include <unistd.h>

static char *dup_str(const char *s) {
    char *d = malloc(strlen(s) + 1);

    if (d) {
        strcpy(d, s);
    }

    return d;
}

struct file_info *file_load(const char *path) {
    FILE *n_file = fopen(path, "rb");

    if (!n_file) {
        return NULL;
    }

    if (fseek(n_file, 0, SEEK_END) != 0) {
        fclose(n_file);

        return NULL;
    }

    const long size = ftell(n_file);

    rewind(n_file);

    char *buffer = malloc(size + 1);

    const size_t read_n = fread(buffer, 1, size, n_file);

    fclose(n_file);

    buffer[read_n] = '\0';

    struct file_info *file = malloc(sizeof(*file));

    file->text = buffer;
    file->size = read_n;

    const char *slash = strrchr(path, '/');
    const char *backslash = strrchr(path, '\\');
    const char *file_name = path;

    file_name = (slash > backslash ? slash : backslash) + 1;

    file->name = dup_str(file_name);
    const char *dot = strrchr(file_name, '.');

    if (dot && dot != file_name) {
        file->ext = dup_str(dot + 1);
    } else {
        file->ext = NULL;
    }

    return file;
}

void file_free(struct file_info *file) {
    if (file == NULL) {
        return;
    }

    free(file->name);
    free(file->text);
    free(file->ext);
    free(file);
}
