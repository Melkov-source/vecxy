#include "core/parser.h"
#include <stdio.h>
#include <stdlib.h>

// глобальные
static const struct list *g_tokens = NULL;
static size_t g_pos = 0;

// --- utils ---
static struct token *peek(void) {
    if (g_pos >= g_tokens->count) return NULL;
    return (struct token*)list_get((struct list*)g_tokens, g_pos);
}
static struct token *peek_next(void) {
    if (g_pos + 1 >= g_tokens->count) return NULL;
    return (struct token*)list_get((struct list*)g_tokens, g_pos+1);
}

static  struct token *peek_back(void) {
    if (g_pos - 1 <= 0) return NULL;
    return (struct token*)list_get((struct list*)g_tokens, g_pos - 1);
}

static int is_at_end(void) { return g_pos >= g_tokens->count; }
static struct token *advance(void) { return !is_at_end() ? (struct token*)list_get((struct list*)g_tokens, g_pos++) : NULL; }
static int check(enum token_type type) { struct token *t = peek(); return t && t->type == type; }
static int check_kw(enum keyword_type kw) { struct token *t = peek(); return t && t->keyword == kw; }

static struct token *consume(enum token_type type, const char *msg) {
    struct token *t = peek();
    if (t && t->type == type) return advance();
    fprintf(stderr, "Parse error: expected %s at pos %zu\n", msg, g_pos);
    exit(1);
}
static void consume_kw(enum keyword_type kw, const char *msg) {
    struct token *t = peek();
    if (t && t->keyword == kw) { advance(); return; }
    fprintf(stderr, "Parse error: expected keyword %s at pos %zu\n", msg, g_pos);
    exit(1);
}

// --- AST utils ---
static struct node *make_node(enum node_type type) {
    struct node *n = calloc(1, sizeof(struct node));
    n->type = type;
    list_init(&n->children);
    return n;
}
void free_node(struct node *n) {
    if (!n) return;
    for (struct list_node *cur = n->children.head; cur; cur = cur->next)
        free_node((struct node*)cur->data);
    free(n);
}

// --- forward ---
static struct node *parse_statement(void);
static struct node *parse_expression(void);

// --- parse function ---
static struct node *parse_function(void) {
    consume_kw(KEYWORD_TYPE_FN, "fn");

    consume(TOKEN_TYPE_TO, "'::' or 'to'");

    // return type
    struct token *t = peek();
    char *ret_type = NULL;
    if (t->keyword == KEYWORD_TYPE_INT) { ret_type = "int"; advance(); }
    else if (t->keyword == KEYWORD_TYPE_STRING) { ret_type = "string"; advance(); }
    else ret_type = "auto";

    // function name
    struct token *nameTok = consume(TOKEN_TYPE_IDENTIFIER, "identifier");
    struct node *fn = make_node(NODE_FUNCTION);
    fn->name = nameTok->value_string;
    fn->return_type = ret_type;

    consume(TOKEN_TYPE_LBRACKET, "(");
    // TODO: Parse parameters
    consume(TOKEN_TYPE_RBRACKET, ")");
    consume(TOKEN_TYPE_LBRACE, "{");

    while (!check(TOKEN_TYPE_RBRACE) && !is_at_end()) {
        struct node *stmt = parse_statement();
        if (stmt) list_add(&fn->children, stmt);
    }

    consume(TOKEN_TYPE_RBRACE, "}");
    return fn;
}

// --- parse statement ---
static struct node *parse_statement(void) {
    // return
    if (check_kw(KEYWORD_TYPE_RETURN)) {
        advance();

        struct node *expr = parse_expression();
        struct node *r = make_node(NODE_RETURN);

        list_add(&r->children, expr);
        consume(TOKEN_TYPE_SEMICOLON, ";");
        return r;
    }

    // int x = 5;
    if (check_kw(KEYWORD_TYPE_INT) || check_kw(KEYWORD_TYPE_STRING)) {
        struct token *kw = advance();
        char *type = kw->keyword == KEYWORD_TYPE_INT ? "int" : "string";
        struct token *nameTok = consume(TOKEN_TYPE_IDENTIFIER, "identifier");

        struct node *decl = make_node(NODE_VAR_DECL);
        decl->name = nameTok->value_string;
        decl->return_type = type;

        if (check(TOKEN_TYPE_ASSIGN)) {
            advance();
            struct node *val = parse_expression();
            list_add(&decl->children, val);
        }

        consume(TOKEN_TYPE_SEMICOLON, ";");
        return decl;
    }

    if (check(TOKEN_TYPE_IDENTIFIER) && peek_next()->type == TOKEN_TYPE_TO) {
        struct token *module_name = peek();
        struct node *node_call_module = make_node(NODE_CALL_MODULE);
        node_call_module->string_value = module_name->value_string;

        advance();

        advance(); // ::

        struct node *node_call = parse_statement();

        list_add(&node_call_module->children, node_call);

        return node_call_module;
    }

    // вызов функции
    if (check(TOKEN_TYPE_IDENTIFIER) && peek_next()->type == TOKEN_TYPE_LBRACKET) {
        struct token *nameTok = advance();
        struct node *call = make_node(NODE_CALL);
        call->name = nameTok->value_string;
        consume(TOKEN_TYPE_LBRACKET, "(");
        while (!check(TOKEN_TYPE_RBRACKET)) {
            struct node *arg = parse_expression();
            list_add(&call->children, arg);
            if (check(TOKEN_TYPE_COMMA)) advance();
        }
        consume(TOKEN_TYPE_RBRACKET, ")");
        consume(TOKEN_TYPE_SEMICOLON, ";");
        return call;
    }

    // пустая инструкция
    if (check(TOKEN_TYPE_SEMICOLON)) {
        advance();
        return make_node(NODE_EMPTY);
    }

    fprintf(stderr, "Unknown statement at pos %zu\n", g_pos);
    exit(1);
}

// --- parse expression (упрощённо) ---
static struct node *parse_expression(void) {
    if (check(TOKEN_TYPE_INT)) {
        struct token *t = advance();
        struct node *n = make_node(NODE_NUMBER);
        n->int_value = t->value_int;
        return n;
    }
    if (check(TOKEN_TYPE_STRING)) {
        struct token *t = advance();
        struct node *n = make_node(NODE_STRING);
        n->string_value = t->value_string;
        return n;
    }
    if (check(TOKEN_TYPE_IDENTIFIER)) {
        struct token *t = advance();
        struct node *n = make_node(NODE_VAR_REF);
        n->name = t->value_string;
        return n;
    }

    fprintf(stderr, "Unknown expression at pos %zu\n", g_pos);
    exit(1);
}

// --- parse root ---
struct node *parse(const struct list *tokens) {
    g_tokens = tokens;
    g_pos = 0;

    struct node *program = make_node(NODE_PROGRAM);

    while (!is_at_end()) {
        struct token *t = peek();
        if (t->type == TOKEN_TYPE_HASH) {
            advance();

            if (check(TOKEN_TYPE_IDENTIFIER) &&check_kw(KEYWORD_TYPE_IMPORT)) {
                struct node *node_import = make_node(NODE_IMPORT);
                advance();

                list_add(&program->children, node_import);

                if (check(TOKEN_TYPE_IDENTIFIER)) {
                    struct node *node_module = make_node(NODE_IMPORT_MODULE);
                    const struct token *module_name = advance();

                    node_module->string_value = module_name->value_string;

                    list_add(&node_import->children, node_module);

                    consume(TOKEN_TYPE_SEMICOLON, ";");
                }
            }
        }
        else if (t->keyword == KEYWORD_TYPE_FN) {
            struct node *fn = parse_function();
            list_add(&program->children, fn);
        }
        else {
            fprintf(stderr, "Unexpected token at top level\n");
            break;
        }
    }

    return program;
}