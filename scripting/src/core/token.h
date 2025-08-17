#ifndef SCRIPTING_TOKEN_H
#define SCRIPTING_TOKEN_H

enum token_type {
    TOKEN_IDENTIFIER,

    TOKEN_IMPORT,
    TOKEN_EXPORT,

    TOKEN_CLASS,
    TOKEN_STRUCT,

    TOKEN_FN,
    TOKEN_CTOR,

    TOKEN_RETURN,
    TOKEN_CONST,

    TOKEN_VOID,
    TOKEN_INT,
    TOKEN_FLOAT,
    TOKEN_CHAR,
    TOKEN_STRING,

    TOKEN_PUBLIC,
    TOKEN_PRIVATE,


    TOKEN_HASH,         // #
    TOKEN_COLON,        // :
    TOKEN_DOUBLE_COLON, // ::
    TOKEN_SEMICOLON,    // ;
    TOKEN_COMMA,        // ,
    TOKEN_DOT,          // .
    TOKEN_ASSIGN,       // =
    TOKEN_LPAREN,       // (
    TOKEN_RPAREN,       // )
    TOKEN_LBRACE,       // {
    TOKEN_RBRACE,       // }
    TOKEN_PLUS,         // +
    TOKEN_MINUS,        // -
    TOKEN_STAR,         // *
    TOKEN_SLASH,        // /

    TOKEN_EOF
};


struct token {
    enum token_type type;
    const char *start;
    size_t length;
};

#endif //SCRIPTING_TOKEN_H
