#include "token.h"

#include <stdio.h>
#include <string.h>

enum keyword_type identifier_to_keyword_type(const char *ident) {
    if (strcmp(ident, "main") == 0) return keyword_type_main;
    if (strcmp(ident, "fn") == 0) return keyword_type_fn;
    if (strcmp(ident, "return") == 0) return keyword_type_return;

    if (strcmp(ident, "int") == 0) return keyword_type_int;
    if (strcmp(ident, "float") == 0) return keyword_type_float;
    if (strcmp(ident, "string") == 0) return keyword_type_string;
    if (strcmp(ident, "null") == 0) return keyword_type_null;

    if (strcmp(ident, "import") == 0) return keyword_type_import;
    if (strcmp(ident, "export") == 0) return keyword_type_export;

    if (strcmp(ident, "pack") == 0) return keyword_type_pack;
    if (strcmp(ident, "mix") == 0) return keyword_type_mix;
    if (strcmp(ident, "kind") == 0) return keyword_type_kind;

    if (strcmp(ident, "new") == 0) return keyword_type_new;
    if (strcmp(ident, "ctor") == 0) return keyword_type_ctor;
    if (strcmp(ident, "lock") == 0) return keyword_type_lock;

    if (strcmp(ident, "public") == 0) return keyword_type_public;
    if (strcmp(ident, "private") == 0) return keyword_type_private;
    if (strcmp(ident, "protected") == 0) return keyword_type_protected;
    if (strcmp(ident, "static") == 0) return keyword_type_static;
    if (strcmp(ident, "const") == 0) return keyword_type_const;

    if (strcmp(ident, "add") == 0) return keyword_type_add;
    if (strcmp(ident, "is") == 0) return keyword_type_is;
    if (strcmp(ident, "to") == 0) return keyword_type_to;
    if (strcmp(ident, "of") == 0) return keyword_type_of;

    if (strcmp(ident, "for") == 0) return keyword_type_for;
    if (strcmp(ident, "while") == 0) return keyword_type_while;
    if (strcmp(ident, "do") == 0) return keyword_type_do;

    if (strcmp(ident, "break") == 0) return keyword_type_break;
    if (strcmp(ident, "continue") == 0) return keyword_type_continue;

    return keyword_type_none;
}

void print_tokens(struct list **tok) {
    struct list *tokens = *tok;

    for (size_t i = 0; i < tokens->count; i++) {
        const struct token *token = list_get(tokens, i);

        printf("Token %zu: ", i);

        switch (token->type) {
            case TOKEN_TYPE_IDENTIFIER:
                printf("IDENTIFIER (%s)", token->value_string);
                if (token->identifier == identifier_type_keyword) {
                    printf(" [keyword]");
                }
                break;

            case TOKEN_TYPE_HASH:
                printf("HASH (#)");
                break;

            case TOKEN_TYPE_TO:
                printf("TO (::)");
                break;

            case TOKEN_TYPE_LBRACKET:
                printf("LBRACKET (%s)", token->value_string);
                break;

            case TOKEN_TYPE_RBRACKET:
                printf("RBRACKET (%s)", token->value_string);
                break;

            case TOKEN_TYPE_LBRACE:
                printf("LBRACE (%s)", token->value_string);
                break;

            case TOKEN_TYPE_RBRACE:
                printf("RBRACE (%s)", token->value_string);
                break;

            case TOKEN_TYPE_LSQUARE:
                printf("LSQUARE (%s)", token->value_string);
                break;

            case TOKEN_TYPE_RSQUARE:
                printf("RSQUARE (%s)", token->value_string);
                break;

            case TOKEN_TYPE_INT:
                printf("INT (%d)", token->value_int);
                break;

            case TOKEN_TYPE_STRING:
                printf("STRING (%s)", token->value_string);
                break;

            case token_type_semicolon:
                printf("SEMICOLON (;)");
                break;

            case token_type_comma:
                printf("COMMA (,)");
                break;

            case TOKEN_TYPE_USE:
                printf("USE (:)");
                break;

            case token_type_assign:
                printf("ASSIGN (=)");
                break;;

            default:
                printf("UNKNOWN (%s)", token->value_string ? token->value_string : "null");
                break;
        }

        printf("\n");
    }
}
