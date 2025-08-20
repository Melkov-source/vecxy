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

    TOKEN_TYPE_ASSIGN,

    TOKEN_TYPE_SEMICOLON,
    TOKEN_TYPE_COMMA,
};

enum identifier_type {
    IDENTIFIER_TYPE_NONE = 0,

    IDENTIFIER_TYPE_NAME,
    IDENTIFIER_TYPE_KEYWORD,
};

enum keyword_type {
    KEYWORD_TYPE_NONE = 0,

    KEYWORD_TYPE_MAIN,
    KEYWORD_TYPE_FN,
    KEYWORD_TYPE_RETURN,

    KEYWORD_TYPE_INT,
    KEYWORD_TYPE_FLOAT,
    KEYWORD_TYPE_STRING,
    KEYWORD_TYPE_NULL,

    KEYWORD_TYPE_IMPORT,
    KEYWORD_TYPE_EXPORT,
    KEYWORD_TYPE_MODULE,

    KEYWORD_TYPE_PACK,
    KEYWORD_TYPE_MIX,
    KEYWORD_TYPE_KIND,

    KEYWORD_TYPE_NEW,
    KEYWORD_TYPE_CTOR,
    KEYWORD_TYPE_LOCK,

    KEYWORD_TYPE_PUBLIC,
    KEYWORD_TYPE_PRIVATE,
    KEYWORD_TYPE_PROTECTED,
    KEYWORD_TYPE_STATIC,
    KEYWORD_TYPE_CONST,

    KEYWORD_TYPE_ADD,
    KEYWORD_TYPE_IS,
    KEYWORD_TYPE_TO,
    KEYWORD_TYPE_OF,

    KEYWORD_TYPE_FOR,
    KEYWORD_TYPE_WHILE,
    KEYWORD_TYPE_DO,

    KEYWORD_TYPE_BREAK,
    KEYWORD_TYPE_CONTINUE,
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

void print_tokens(struct list *tok);
enum keyword_type identifier_to_keyword_type(const char *ident);

#endif //SCRIPTING_TOKEN_H