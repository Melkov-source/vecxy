#include <stdio.h>

#include "file.h"

struct token  *lex(char *code);

enum token_type {
    token_type_none = 0,
    token_type_identifier,

    token_type_hash,
    token_type_to,

    token_type_lbracket,
    token_type_rbracket,
    token_type_lbrace,
    token_type_rbrace,

    token_type_int,
    token_type_float,
    token_type_string,

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
    char *value_int;
    char *value_float;
};

int main(void) {
    const struct file_info *file = file_load("E:\\Projects\\vecxy\\scripting\\scripts\\test.ms");

    char *code = file->text;

    lex(code);

    return 0;
}



struct token *lex(char *code) {
    struct token *tokens = malloc(sizeof(struct token) * 10);

    int count = 0;

    char *p = code;

    while (*p)
    {
        if(isspace(*p)) {
            p++;

            continue;
        }

        if(*p == '#') {
            struct token *token = malloc(sizeof(struct token));

            token->type = token_type_hash;
            token->identifier = identifier_type_none;
            token->keyword = keyword_type_none;
            token->value_string = strndup(p, 1);;

            tokens[count++] = *token;

            p++;
        }

        p++;
    }
    

    return &tokens;
}
