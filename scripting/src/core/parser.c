#include <string.h>
#include <stdlib.h>
#include <stdio.h>

#include "parser.h"
#include "ast.h"

struct node *parse_expression(const struct token **t_ptr);

static char *__strndup(const char *s, size_t n) {
    char *p = malloc(n + 1);
    if (!p) return NULL;
    memcpy(p, s, n);
    p[n] = '\0';
    return p;
}

struct node *parse(const struct token *tokens) {
    const struct token *t = tokens;

    if (t->type != TOKEN_TYPE_KEYWORD || strncmp(t->start, "fn", t->length) != 0) {
        return NULL;
    }

    t++;
}

// Парсим весь токен поток
struct node *parse_tokens(struct  script *script) {
    const struct token *t = script->tokens;

    if (t->type != TOKEN_TYPE_KEYWORD || strncmp(t->start, "fn", t->length) != 0)
        return NULL;
    t++;

    if (t->type != TOKEN_TYPE_IDENTIFIER) return NULL;

    struct node *func_node = malloc(sizeof(struct node));
    func_node->type = NODE_TYPE_FUNCTION;
    func_node->name = __strndup(t->start, t->length);
    func_node->child = NULL;
    func_node->next = NULL;

    t++;
    if (t->type != TOKEN_TYPE_OPERATOR || *t->start != '(') return NULL;
    t++;
    if (t->type != TOKEN_TYPE_OPERATOR || *t->start != ')') return NULL;
    t++;
    if (t->type != TOKEN_TYPE_OPERATOR || *t->start != '{') return NULL;
    t++;

    struct node *last_node = NULL;

    while (t->type != TOKEN_TYPE_OPERATOR || *t->start != '}') {
        struct node *stmt = parse_expression(&t);
        if (!stmt) return NULL;

        if (!func_node->child) func_node->child = stmt;
        else last_node->next = stmt;

        last_node = stmt;
    }

    t++; // закрывающая '}'
    return func_node;
}

// Парсим одно выражение
struct node *parse_expression(const struct token **t_ptr) {
    const struct token *t = *t_ptr;

    // return NUMBER;
    if (t->type == TOKEN_TYPE_KEYWORD && strncmp(t->start, "return", t->length) == 0) {
        t++;
        if (t->type != TOKEN_TYPE_NUMBER) return NULL;

        struct node *ret = malloc(sizeof(struct node));
        ret->type = NODE_TYPE_RETURN;
        ret->next = NULL;

        struct node *val = malloc(sizeof(struct node));
        val->type = NODE_TYPE_NUMBER;
        val->value = atoi(t->start);
        val->child = val->next = NULL;

        ret->child = val;

        t++;
        if (t->type != TOKEN_TYPE_OPERATOR || *t->start != ';') return NULL;
        t++;

        *t_ptr = t;
        return ret;
    }

    // int IDENTIFIER [= NUMBER] ;
    if (t->type == TOKEN_TYPE_KEYWORD && strncmp(t->start, "int", t->length) == 0) {
        t++;
        if (t->type != TOKEN_TYPE_IDENTIFIER) return NULL;

        const char *var_name = t->start;
        size_t var_len = t->length;

        t++;

        struct node *decl = malloc(sizeof(struct node));
        decl->type = NODE_TYPE_VAR_DECL;
        decl->name = __strndup(var_name, var_len);
        decl->child = decl->next = NULL;

        if (t->type == TOKEN_TYPE_OPERATOR && *t->start == '=') {
            t++;
            if (t->type != TOKEN_TYPE_NUMBER) return NULL;

            struct node *val = malloc(sizeof(struct node));
            val->type = NODE_TYPE_NUMBER;
            val->value = atoi(t->start);
            val->child = val->next = NULL;
            decl->child = val;

            t++;
        }

        if (t->type != TOKEN_TYPE_OPERATOR || *t->start != ';') return NULL;
        t++;

        *t_ptr = t;
        return decl;
    }

    // IDENTIFIER = NUMBER ;
    if (t->type == TOKEN_TYPE_IDENTIFIER) {
        const char *name_start = t->start;
        size_t name_len = t->length;
        t++;

        if (t->type == TOKEN_TYPE_OPERATOR && *t->start == '=') {
            t++;
            if (t->type != TOKEN_TYPE_NUMBER) return NULL;

            struct node *assign = malloc(sizeof(struct node));
            assign->type = NODE_TYPE_ASSIGN;
            assign->name = __strndup(name_start, name_len);

            struct node *val = malloc(sizeof(struct node));
            val->type = NODE_TYPE_NUMBER;
            val->value = atoi(t->start);
            val->child = val->next = NULL;

            assign->child = val;
            assign->next = NULL;

            t++;
            if (t->type != TOKEN_TYPE_OPERATOR || *t->start != ';') return NULL;
            t++;

            *t_ptr = t;
            return assign;
        }

        // Вызов функции: IDENTIFIER "(" STRING ")" ;
        if (t->type == TOKEN_TYPE_OPERATOR && *t->start == '(') {
            struct node *call_node = malloc(sizeof(struct node));
            call_node->type = NODE_TYPE_CALL;
            call_node->name = __strndup(name_start, name_len);
            call_node->child = call_node->next = NULL;

            t++; // пропускаем '('
            if (t->type == TOKEN_TYPE_STRING) {
                struct node *arg = malloc(sizeof(struct node));
                arg->type = NODE_TYPE_STRING;
                arg->str = malloc(t->length + 1);
                memcpy(arg->str, t->start, t->length);
                arg->str[t->length] = '\0';
                arg->child = arg->next = NULL;
                call_node->child = arg;
                t++;
            }

            if (t->type != TOKEN_TYPE_OPERATOR || *t->start != ')') return NULL;
            t++;
            if (t->type != TOKEN_TYPE_OPERATOR || *t->start != ';') return NULL;
            t++;

            *t_ptr = t;
            return call_node;
        }
    }

    return NULL;
}
