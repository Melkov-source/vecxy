#include "core/token.h"

#include <stdio.h>
#include <string.h>

enum keyword_type identifier_to_keyword_type(const char *ident) {
    if (strcmp(ident, "main") == 0) return KEYWORD_TYPE_MAIN;
    if (strcmp(ident, "fn") == 0) return KEYWORD_TYPE_FN;
    if (strcmp(ident, "return") == 0) return KEYWORD_TYPE_RETURN;

    if (strcmp(ident, "int") == 0) return KEYWORD_TYPE_INT;
    if (strcmp(ident, "float") == 0) return KEYWORD_TYPE_FLOAT;
    if (strcmp(ident, "string") == 0) return KEYWORD_TYPE_STRING;
    if (strcmp(ident, "null") == 0) return KEYWORD_TYPE_NULL;

    if (strcmp(ident, "import") == 0) return KEYWORD_TYPE_IMPORT;
    if (strcmp(ident, "export") == 0) return KEYWORD_TYPE_EXPORT;
    if(strcmp(ident, "module") == 0) return KEYWORD_TYPE_MODULE;

    if (strcmp(ident, "pack") == 0) return KEYWORD_TYPE_PACK;
    if (strcmp(ident, "mix") == 0) return KEYWORD_TYPE_MIX;
    if (strcmp(ident, "kind") == 0) return KEYWORD_TYPE_KIND;

    if (strcmp(ident, "new") == 0) return KEYWORD_TYPE_NEW;
    if (strcmp(ident, "ctor") == 0) return KEYWORD_TYPE_CTOR;
    if (strcmp(ident, "lock") == 0) return KEYWORD_TYPE_LOCK;

    if (strcmp(ident, "public") == 0) return KEYWORD_TYPE_PUBLIC;
    if (strcmp(ident, "private") == 0) return KEYWORD_TYPE_PRIVATE;
    if (strcmp(ident, "protected") == 0) return KEYWORD_TYPE_PROTECTED;
    if (strcmp(ident, "static") == 0) return KEYWORD_TYPE_STATIC;
    if (strcmp(ident, "const") == 0) return KEYWORD_TYPE_CONST;

    if (strcmp(ident, "add") == 0) return KEYWORD_TYPE_ADD;
    if (strcmp(ident, "is") == 0) return KEYWORD_TYPE_IS;
    if (strcmp(ident, "to") == 0) return KEYWORD_TYPE_TO;
    if (strcmp(ident, "of") == 0) return KEYWORD_TYPE_OF;

    if (strcmp(ident, "for") == 0) return KEYWORD_TYPE_FOR;
    if (strcmp(ident, "while") == 0) return KEYWORD_TYPE_WHILE;
    if (strcmp(ident, "do") == 0) return KEYWORD_TYPE_DO;

    if (strcmp(ident, "break") == 0) return KEYWORD_TYPE_BREAK;
    if (strcmp(ident, "continue") == 0) return KEYWORD_TYPE_CONTINUE;

    return KEYWORD_TYPE_NONE;
}

void print_tokens(struct list *tok) {
    struct list *tokens = tok;

    for (size_t i = 0; i < tokens->count; i++) {
        const struct token *token = list_get(tokens, i);

        printf("Token %zu: ", i);

        switch (token->type) {
            case TOKEN_TYPE_IDENTIFIER:
                printf("IDENTIFIER (%s)", token->value_string);
                if (token->identifier == IDENTIFIER_TYPE_KEYWORD) {
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

            case TOKEN_TYPE_SEMICOLON:
                printf("SEMICOLON (;)");
                break;

            case TOKEN_TYPE_COMMA:
                printf("COMMA (,)");
                break;

            case TOKEN_TYPE_USE:
                printf("USE (:)");
                break;

            case TOKEN_TYPE_ASSIGN:
                printf("ASSIGN (=)");
                break;;

            default:
                printf("UNKNOWN (%s)", token->value_string ? token->value_string : "null");
                break;
        }

        printf("\n");
    }
}
