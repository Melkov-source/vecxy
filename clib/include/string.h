#ifndef CLIB_STRING_H
#define CLIB_STRING_H
#include <stddef.h>

struct string {
    char *value;
    size_t length;
};

struct string string_create(int capacity);
struct string string_create_from_text(const char *text);
struct string* string_create_heap(int capacity);

void string_free(struct string *string);
void string_free_heap(struct string* string);

void string_set(struct string *string, const char *text, size_t text_length);

#endif // CLIB_STRING_H