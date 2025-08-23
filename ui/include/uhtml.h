#ifndef UI_UHTML_H
#define UI_UHTML_H

#include "string.h"

enum uhtml_query_type {
    UHTML_QUERY_TYPE_NONE = 0,

    UHTML_QUERY_TYPE_ID = 1,
    UHTML_QUERY_TYPE_CLASS = 2,
};

struct uhtml_query_info {
    struct string text;
    enum uhtml_query_type type;
};

struct uhtml {
};

struct uhtml *uhtml_create(void);
void uhtml_free(struct uhtml *uhtml);

void uhtml_query(struct uhtml_query_info info);

#endif //UI_UHTML_H
