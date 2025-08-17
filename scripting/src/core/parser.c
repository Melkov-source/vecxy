#include "parser.h"
#include <stdlib.h>
#include <string.h>

struct node *parse_expression(const struct token **t_ptr);

struct node *parse_tokens(const struct token *tokens) {
    const struct token *t = tokens;

    if (t->type == TOKEN_TYPE_KEYWORD && strncmp(t->start, "fn", t->length) == 0) {
        t++;
        if (t->type != TOKEN_TYPE_IDENTIFIER) return NULL;

        struct node *func_node = malloc(sizeof(struct node));
        func_node->type = NODE_TYPE_FUNCTION;
        func_node->name = malloc(t->length + 1);
        memcpy(func_node->name, t->start, t->length);
        func_node->name[t->length] = '\0';
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

            if (!func_node->child) {
                func_node->child = stmt;
            } else {
                last_node->next = stmt;
            }

            last_node = stmt; // не нужно идти в конец stmt, stmt->next всегда NULL
        }

        t++; // закрывающая скобка
        return func_node;
    }

    return NULL;
}

struct node *parse_expression(const struct token **t_ptr) {
    const struct token *t = *t_ptr;

    // return NUMBER;
    if (t->type == TOKEN_TYPE_KEYWORD && strncmp(t->start, "return", t->length) == 0) {
        t++;
        if (t->type != TOKEN_TYPE_NUMBER) return NULL;

        struct node *return_node = malloc(sizeof(struct node));
        return_node->type = NODE_TYPE_RETURN;
        return_node->child = malloc(sizeof(struct node));
        return_node->child->type = NODE_TYPE_NUMBER;
        return_node->child->value = atoi(t->start);
        return_node->child->next = NULL;
        return_node->next = NULL;

        t++;
        if (t->type != TOKEN_TYPE_OPERATOR || *t->start != ';') return NULL;
        t++;

        *t_ptr = t;
        return return_node;
    }

    // IDENTIFIER "(" STRING ")";
    if (t->type == TOKEN_TYPE_IDENTIFIER) {
        struct node *call_node = malloc(sizeof(struct node));
        call_node->type = NODE_TYPE_CALL;
        call_node->name = malloc(t->length + 1);
        memcpy(call_node->name, t->start, t->length);
        call_node->name[t->length] = '\0';
        call_node->child = NULL;
        call_node->next = NULL;

        t++;
        if (t->type != TOKEN_TYPE_OPERATOR || *t->start != '(') return NULL;
        t++;

        if (t->type == TOKEN_TYPE_STRING) {
            struct node *arg = malloc(sizeof(struct node));
            arg->type = NODE_TYPE_STRING;

            const char *raw = t->start;
            size_t len = t->length;

            // убираем начальные и конечные кавычки
            arg->str = malloc(len + 1);
            memcpy(arg->str, raw, len);
            arg->str[len] = '\0';

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

    return NULL;
}
