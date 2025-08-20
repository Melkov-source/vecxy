#ifndef SCRIPTING_TOKEN_H
#define SCRIPTING_TOKEN_H

#include "list.h"
#include "stdbool.h"

enum token_type {
    TOKEN_TYPE_NONE = 0,
    TOKEN_TYPE_IDENTIFIER,

    TOKEN_TYPE_HASH,
    TOKEN_TYPE_TO,
    TOKEN_TYPE_USE,

    TOKEN_TYPE_LBRACKET,
    TOKEN_TYPE_RBRACKET,
    TOKEN_TYPE_LBRACE,
    TOKEN_TYPE_RBRACE,
    TOKEN_TYPE_LSQUARE,
    TOKEN_TYPE_RSQUARE,

    TOKEN_TYPE_INT,
    TOKEN_TYPE_FLOAT,
    TOKEN_TYPE_STRING,
    TOKEN_TYPE_BOOL,

    token_type_assign,

    token_type_semicolon,
    token_type_comma,
};

enum identifier_type {
    identifier_type_none = 0,

    identifier_type_name,
    identifier_type_keyword,
};

enum keyword_type {
    keyword_type_none = 0,

    keyword_type_main,
    keyword_type_fn,
    keyword_type_return,

    keyword_type_int,
    keyword_type_float,
    keyword_type_string,
    keyword_type_null,

    keyword_type_import,
    keyword_type_export,

    keyword_type_pack,
    keyword_type_mix,
    keyword_type_kind,

    keyword_type_new,
    keyword_type_ctor,
    keyword_type_lock,

    keyword_type_public,
    keyword_type_private,
    keyword_type_protected,
    keyword_type_static,
    keyword_type_const,

    keyword_type_add,
    keyword_type_is,
    keyword_type_to,
    keyword_type_of,

    keyword_type_for,
    keyword_type_while,
    keyword_type_do,

    keyword_type_break,
    keyword_type_continue,
};

struct token {
    enum token_type type;
    enum identifier_type identifier;
    enum keyword_type keyword;

    char *value_string;
    int value_int;
    float value_float;
    bool value_bool;
};

void print_tokens(struct list **tok);
enum keyword_type identifier_to_keyword_type(const char *ident);

#endif //SCRIPTING_TOKEN_H