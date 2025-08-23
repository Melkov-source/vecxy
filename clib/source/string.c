#include "string.h"
#include <stdlib.h>

struct string string_create(const int capacity) {
    const struct string string = {
        .value = malloc(capacity),
        .length = 0,
    };

    return string;
}

void string_free(struct string *string) {
    if (string->value) {
        free(string->value);

        string->value = NULL;
    }

    string->length = 0;
}

struct string* string_create_heap(const int capacity) {
    struct string* string = malloc(sizeof(struct string));

    if (string == NULL) {
        return NULL;
    }

    string->value = malloc(capacity);

    if (string->value == NULL) {
        free(string);
        return NULL;
    }

    string->length = 0;

    return string;
}

void string_free_heap(struct string* string) {
    if (string == NULL) {
        return;
    }

    free(string->value);
    free(string);
}


void string_set(struct string *string, const char *text, const size_t text_lenght) {
    if (text_lenght > 0) {
        for (size_t i = 0; i < text_lenght; i++) {
            string->value[i] = text[i];
        }
    }

    string->length = text_lenght;
}