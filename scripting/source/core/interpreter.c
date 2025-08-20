#include "core/interpreter.h"
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

// --- окружение ---
struct variable {
    char *name;
    struct value val;
};

struct function {
    char *name;
    struct node *body; // AST-узел функции
};

// глобальное состояние
static struct list *g_variables;
static struct list *g_functions;

// --- поиск ---
static struct variable *find_var(const char *name) {
    for (size_t i = 0; i < g_variables->count; i++) {
        struct variable *v = list_get(g_variables, i);
        if (strcmp(v->name, name) == 0) return v;
    }
    return NULL;
}

static struct function *find_fn(const char *name) {
    for (size_t i = 0; i < g_functions->count; i++) {
        struct function *f = list_get(g_functions, i);
        if (strcmp(f->name, name) == 0) return f;
    }
    return NULL;
}

// --- вычисление выражений ---
static struct value eval_expr(struct node *n) {
    struct value v = {0};
    switch (n->type) {
    case NODE_NUMBER:
        v.type = VAL_INT;
        v.int_value = n->int_value;
        break;
    case NODE_STRING:
        v.type = VAL_STRING;
        v.string_value = n->string_value;
        break;
    case NODE_VAR_REF: {
        struct variable *var = find_var(n->name);
        if (!var) {
            fprintf(stderr, "Runtime error: undefined variable %s\n", n->name);
            exit(1);
        }
        v = var->val;
        break;
    }
    default:
        fprintf(stderr, "Runtime error: unknown expression node\n");
        exit(1);
    }
    return v;
}

// --- выполнение инструкции ---
static struct value exec_stmt(struct node *n) {
    struct value ret = {0};
    switch (n->type) {
    case NODE_RETURN:
        ret = eval_expr((struct node*)n->children.head->data);
        return ret;

    case NODE_VAR_DECL: {
        struct variable *v = malloc(sizeof(*v));
        v->name = n->name;
        if (n->children.count > 0) {
            struct node *valNode = n->children.head->data;
            v->val = eval_expr(valNode);
        }
        list_add(g_variables, v);
        break;
    }

    case NODE_CALL: {
        struct function *fn = find_fn(n->name);
        if (fn) {
            // вызов функции (пока без аргументов)
            ret = exec_stmt(fn->body);
        }
        break;
    }

    case NODE_CALL_MODULE: {
        struct node *callNode = n->children.head->data;
        char *fnName = callNode->name;

        // найти модуль
        for (size_t i = 0; i < modules->count; i++) {
            struct module *m = list_get(modules, i);
            if (strcmp(m->name, n->string_value) == 0) {
                for (size_t j = 0; j < m->exports->count; j++) {
                    struct module_export_entity *exp = list_get(m->exports, j);
                    if (strcmp(exp->name, fnName) == 0) {
                        exp->func(callNode);
                    }
                }
            }
        }
        break;
    }

    default:
        break;
    }
    return ret;
}

// --- выполнение функции ---
static struct value exec_function(struct function *fn) {
    struct value ret = {0};
    for (struct list_node *cur = fn->body->children.head; cur; cur = cur->next) {
        ret = exec_stmt((struct node*)cur->data);
        if (((struct node*)cur->data)->type == NODE_RETURN)
            break;
    }
    return ret;
}

// --- запуск программы ---
int interpret(struct node *program) {
    g_variables = malloc(sizeof(struct list));
    g_functions = malloc(sizeof(struct list));
    list_init(g_variables);
    list_init(g_functions);

    // регистрируем функции
    for (struct list_node *cur = program->children.head; cur; cur = cur->next) {
        struct node *n = cur->data;
        if (n->type == NODE_FUNCTION) {
            struct function *f = malloc(sizeof(*f));
            f->name = n->name;
            f->body = n;
            list_add(g_functions, f);
        }
    }

    // ищем Main
    struct function *mainFn = find_fn("Main");
    if (!mainFn) {
        fprintf(stderr, "Runtime error: No Main() function\n");
        return 1;
    }

    struct value ret = exec_function(mainFn);

    return ret.int_value;
}
