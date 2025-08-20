#include <stdio.h>

#include "core/parser.h"
#include "utils/parser.h"

static struct ast_node *parse_function(struct parser_state *state);
static struct ast_node *parse_statement(struct parser_state *state);
static struct ast_node *parse_expression(struct parser_state *state);

struct ast_node *parse(const struct list *tokens) {

    struct parser_state *state = malloc(sizeof(struct parser_state));
    state->tokens = tokens;
    state->index = 0;

    struct ast_node *program = ast_node_create(AST_NODE_TYPE_PROGRAM);

    while (!parser_is_at_end(state)) {
        const struct token *t = parser_get_current(state);

        if (t->type == TOKEN_TYPE_HASH) {
            parser_continue(state);

            if (parser_check_current_type(state, TOKEN_TYPE_IDENTIFIER) &&parser_check_keyword(state, KEYWORD_TYPE_IMPORT)) {
                struct ast_node *node_import = ast_node_create(AST_NODE_TYPE_IMPORT);
                parser_continue(state);

                list_add(&program->children, node_import);

                if (parser_check_current_type(state, TOKEN_TYPE_IDENTIFIER)) {
                    struct ast_node *node_module = ast_node_create(AST_NODE_TYPE_IMPORT_MODULE);
                    const struct token *module_name = parser_continue(state);

                    node_module->string_value = module_name->value_string;

                    list_add(&node_import->children, node_module);

                    parser_consume_type(state, TOKEN_TYPE_SEMICOLON, ";");
                }
            }
        }
        else if (t->keyword == KEYWORD_TYPE_FN) {
            struct ast_node *fn = parse_function(state);
            list_add(&program->children, fn);
        }
        else {
            fprintf(stderr, "Unexpected token at top level\n");
            break;
        }
    }

    return program;
}

// --- parse function ---
static struct ast_node *parse_function(struct parser_state *state) {
    parser_consume_keyword(state, KEYWORD_TYPE_FN, "fn");

    parser_consume_type(state, TOKEN_TYPE_TO, "'::' or 'to'");

    // return type
    const struct token *t = parser_get_current(state);
    char *ret_type = NULL;
    if (t->keyword == KEYWORD_TYPE_INT) { ret_type = "int"; parser_continue(state); }
    else if (t->keyword == KEYWORD_TYPE_STRING) { ret_type = "string"; parser_continue(state); }
    else ret_type = "auto";

    // function name
    struct token *nameTok = parser_consume_type(state, TOKEN_TYPE_IDENTIFIER, "identifier");
    struct ast_node *fn = ast_node_create(AST_NODE_TYPE_FUNCTION);
    fn->name = nameTok->value_string;
    fn->return_type = ret_type;

    parser_consume_type(state, TOKEN_TYPE_LBRACKET, "(");
    // TODO: Parse parameters
    parser_consume_type(state, TOKEN_TYPE_RBRACKET, ")");
    parser_consume_type(state, TOKEN_TYPE_LBRACE, "{");

    while (!parser_check_current_type(state, TOKEN_TYPE_RBRACE) && !parser_is_at_end(state)) {
        struct ast_node *stmt = parse_statement(state);
        if (stmt) list_add(&fn->children, stmt);
    }

    parser_consume_type(state, TOKEN_TYPE_RBRACE, "}");
    return fn;
}

// --- parse statement ---
static struct ast_node *parse_statement(struct parser_state *state) {
    // return
    if (parser_check_keyword(state, KEYWORD_TYPE_RETURN)) {
        parser_continue(state);

        struct ast_node *expr = parse_expression(state);
        struct ast_node *r = ast_node_create(AST_NODE_TYPE_RETURN);

        list_add(&r->children, expr);
        parser_consume_type(state, TOKEN_TYPE_SEMICOLON, ";");
        return r;
    }

    // int x = 5;
    if (parser_check_keyword(state, KEYWORD_TYPE_INT) || parser_check_keyword(state, KEYWORD_TYPE_STRING)) {
        struct token *kw = parser_continue(state);
        char *type = kw->keyword == KEYWORD_TYPE_INT ? "int" : "string";
        struct token *nameTok = parser_consume_type(state, TOKEN_TYPE_IDENTIFIER, "identifier");

        struct ast_node *decl = ast_node_create(AST_NODE_TYPE_VAR_DECL);
        decl->name = nameTok->value_string;
        decl->return_type = type;

        if (parser_check_current_type(state, TOKEN_TYPE_ASSIGN)) {
            parser_continue(state);
            struct ast_node *val = parse_expression(state);
            list_add(&decl->children, val);
        }

        parser_consume_type(state, TOKEN_TYPE_SEMICOLON, ";");
        return decl;
    }

    if (parser_check_current_type(state, TOKEN_TYPE_IDENTIFIER) && parser_get_next(state)->type == TOKEN_TYPE_TO) {
        const struct token *module_name = parser_get_current(state);
        struct ast_node *node_call_module = ast_node_create(AST_NODE_TYPE_CALL_MODULE);
        node_call_module->string_value = module_name->value_string;

        parser_continue(state);

        parser_continue(state); // ::

        struct ast_node *node_call = parse_statement(state);

        list_add(&node_call_module->children, node_call);

        return node_call_module;
    }

    // вызов функции
    if (parser_check_current_type(state, TOKEN_TYPE_IDENTIFIER) && parser_get_next(state)->type == TOKEN_TYPE_LBRACKET) {
        struct token *nameTok = parser_continue(state);
        struct ast_node *call = ast_node_create(AST_NODE_TYPE_CALL);
        call->name = nameTok->value_string;
        parser_consume_type(state, TOKEN_TYPE_LBRACKET, "(");
        while (!parser_check_current_type(state, TOKEN_TYPE_RBRACKET)) {
            struct ast_node *arg = parse_expression(state);
            list_add(&call->children, arg);
            if (parser_check_current_type(state, TOKEN_TYPE_COMMA)) parser_continue(state);
        }
        parser_consume_type(state, TOKEN_TYPE_RBRACKET, ")");
        parser_consume_type(state, TOKEN_TYPE_SEMICOLON, ";");
        return call;
    }

    // пустая инструкция
    if (parser_check_current_type(state, TOKEN_TYPE_SEMICOLON)) {
        parser_continue(state);
        return ast_node_create(AST_NODE_TYPE_EMPTY);
    }

    fprintf(stderr, "Unknown statement at pos %zu\n", state->index);
    exit(1);
}

// --- parse expression (упрощённо) ---
static struct ast_node *parse_expression(struct parser_state *state) {
    if (parser_check_current_type(state, TOKEN_TYPE_INT)) {
        struct token *t = parser_continue(state);
        struct ast_node *n = ast_node_create(AST_NODE_TYPE_NUMBER);
        n->int_value = t->value_int;
        return n;
    }
    if (parser_check_current_type(state, TOKEN_TYPE_STRING)) {
        struct token *t = parser_continue(state);
        struct ast_node *n = ast_node_create(AST_NODE_TYPE_STRING);
        n->string_value = t->value_string;
        return n;
    }
    if (parser_check_current_type(state, TOKEN_TYPE_IDENTIFIER)) {
        struct token *t = parser_continue(state);
        struct ast_node *n = ast_node_create(AST_NODE_TYPE_VAR_REF);
        n->name = t->value_string;
        return n;
    }

    fprintf(stderr, "Unknown expression at pos %zu\n", state->index);
    exit(1);
}