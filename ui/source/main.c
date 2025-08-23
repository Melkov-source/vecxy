#include <stdio.h>

#include "string.h"

int main(void) {
    struct string text = string_create(500000000);
    string_set(&text, "Hello Worlds!", 13);

    for (size_t index = 0; index < text.length; ++index) {
        printf("%c", text.value[index]);
    }

    return 0;
}
