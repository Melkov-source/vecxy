#include <stdio.h>

#include "core/parser.h"
#include "utils/parser.h"

static struct ast_node *parse_statement(struct parser *parser);

static struct ast_node *parse_expression(struct parser *state);

static void parse_attribute(struct parser *parser);

static void parse_function(struct parser *parser);

static void parse_function_body(struct parser *parser, struct list *body);

static struct list *parse_function_parameters(struct parser *parser);

static char *parse_function_name(struct parser *parser);

const struct ast_node *parser_parse(const struct list *tokens) {
    struct parser *parser = malloc(sizeof(struct parser));
    parser->tokens = tokens;
    parser->index = 0;
    parser->ast = ast_node_create(AST_NODE_TYPE_PROGRAM);

    while (parser_is_end(parser) == false) {
        parse_attribute(parser);
        parse_function(parser);
    }

    return parser->ast;
}

static void parse_attribute(struct parser *parser) {
    const struct token *current = parser_get_current(parser);

    if (current->type == TOKEN_TYPE_HASH == false) {
        return;
    }

    parser_continue(parser);

    if (parser_check_current_type(parser, TOKEN_TYPE_IDENTIFIER) && parser_check_keyword(parser, KEYWORD_TYPE_IMPORT)) {
        struct ast_node *node_import = ast_node_create(AST_NODE_TYPE_IMPORT);
        parser_continue(parser);

        list_add(parser->ast->children, node_import);

        if (parser_check_current_type(parser, TOKEN_TYPE_IDENTIFIER)) {
            struct ast_node *node_module = ast_node_create(AST_NODE_TYPE_IMPORT_MODULE);
            const struct token *module_name = parser_continue(parser);

            node_module->string_value = module_name->value_string;

            list_add(node_import->children, node_module);

            parser_consume_type(parser, TOKEN_TYPE_SEMICOLON, ";");
        }
    }
}

static enum var_type parse_function_return_type(struct parser *parser) {
    parser_consume_type(parser, TOKEN_TYPE_TO, "'::' or 'to'");

    const struct token *current = parser_get_current(parser);

    enum var_type return_type = VAR_TYPE_UNDEFINED;

    switch (current->keyword) {
        case KEYWORD_TYPE_INT:
            return_type = VAR_TYPE_INT;
            parser_continue(parser);
            break;
        case KEYWORD_TYPE_STRING:
            return_type = VAR_TYPE_STRING;
            parser_continue(parser);
            break;
        default:
            return_type = VAR_TYPE_UNDEFINED;
            break;
    }

    return return_type;
}

static char *parse_function_name(struct parser *parser) {
    const struct token *function_name = parser_consume_type(parser, TOKEN_TYPE_IDENTIFIER, "identifier");

    return function_name->value_string;
}

static struct list *parse_function_parameters(struct parser *parser) {
    // TODO: Parameters

    parser_consume_type(parser, TOKEN_TYPE_LBRACKET, "(");
    parser_consume_type(parser, TOKEN_TYPE_RBRACKET, ")");

    return NULL;
}

static void parse_function_body(struct parser *parser, struct list *body) {
    parser_consume_type(parser, TOKEN_TYPE_LBRACE, "{");

    while (parser_check_current_type(parser, TOKEN_TYPE_RBRACE) == false && parser_is_end(parser) == false) {
        struct ast_node *statement = parse_statement(parser);

        if (statement == NULL) {
            parser_continue(parser);
            continue;
        }

        list_add(body, statement);
    }

    parser_consume_type(parser, TOKEN_TYPE_RBRACE, "}");
}

static void parse_function(struct parser *parser) {
    const struct token *current = parser_get_current(parser);

    if (current->keyword != KEYWORD_TYPE_FN) {
        return;
    }

    parser_consume_keyword(parser, KEYWORD_TYPE_FN, "fn");

    const enum var_type return_type = parse_function_return_type(parser);
    const char *function_name = parse_function_name(parser);
    struct list *parameters = parse_function_parameters(parser);

    struct ast_node *function = ast_node_create(AST_NODE_TYPE_FUNCTION);
    function->name = function_name;
    function->parameters = parameters;
    function->return_type = return_type;

    parse_function_body(parser, function->children);

    list_add(parser->ast->children, function);
}

static struct ast_node *parse_return(struct parser *parser) {
    // return X;
    if (parser_check_keyword(parser, KEYWORD_TYPE_RETURN) == false) {
        return NULL;
    }

    parser_continue(parser);

    struct ast_node *expr = parse_expression(parser);
    struct ast_node *return_node = ast_node_create(AST_NODE_TYPE_RETURN);

    list_add(return_node->children, expr);

    parser_consume_type(parser, TOKEN_TYPE_SEMICOLON, ";");

    return return_node;
}

static enum var_type parse_variable_type(struct parser *parser) {
    const struct token *keyword = parser_continue(parser);

    enum var_type variable_type = VAR_TYPE_UNDEFINED;

    switch (keyword->keyword) {
        case KEYWORD_TYPE_INT:
            variable_type = VAR_TYPE_INT;
            break;
        case KEYWORD_TYPE_STRING:
            variable_type = VAR_TYPE_STRING;
            break;
        case KEYWORD_TYPE_FLOAT:
            variable_type = VAR_TYPE_FLOAT;
            break;
        default:
            variable_type = VAR_TYPE_UNDEFINED;
            break;
    }

    return variable_type;
}

static char *parse_variable_name(struct parser *parser) {
    const struct token *name = parser_consume_type(parser, TOKEN_TYPE_IDENTIFIER, "identifier");

    return name->value_string;
}

static struct ast_node *parse_variable(struct parser *parser) {
    // int x = 5;

    const bool is_variable = parser_check_keyword(parser, KEYWORD_TYPE_INT) ||
                             parser_check_keyword(parser, KEYWORD_TYPE_STRING) ||
                             parser_check_keyword(parser, KEYWORD_TYPE_FLOAT);

    if (is_variable == false) {
        return NULL;
    }

    const enum var_type variable_type = parse_variable_type(parser);
    const char *variable_name = parse_variable_name(parser);

    struct ast_node *decl = ast_node_create(AST_NODE_TYPE_VAR_DECL);
    decl->name = variable_name;
    decl->return_type = variable_type;

    if (parser_check_current_type(parser, TOKEN_TYPE_ASSIGN)) {
        parser_continue(parser);
        struct ast_node *val = parse_expression(parser);
        list_add(decl->children, val);
    }

    parser_consume_type(parser, TOKEN_TYPE_SEMICOLON, ";");
    return decl;
}

static char *parse_func_invoke_name(struct parser *parser) {
    const struct token *name = parser_consume_type(parser, TOKEN_TYPE_IDENTIFIER, "identifier");

    return name->value_string;
}

static struct ast_node *parse_func_invoke(struct parser *parser) {
    if (parser_check_current_type(parser, TOKEN_TYPE_IDENTIFIER) == false) {
        return NULL;
    }

    if (parser_get_next(parser)->type == TOKEN_TYPE_LBRACKET == false) {
        return NULL;
    }

    struct ast_node *function = ast_node_create(AST_NODE_TYPE_CALL);

    function->name = parse_func_invoke_name(parser);

    parser_consume_type(parser, TOKEN_TYPE_LBRACKET, "(");

    while (parser_check_current_type(parser, TOKEN_TYPE_RBRACKET) == false) {
        struct ast_node *parameter = parse_expression(parser);

        list_add(function->children, parameter);

        if (parser_check_current_type(parser, TOKEN_TYPE_COMMA)) {
            parser_continue(parser);
        }
    }

    parser_consume_type(parser, TOKEN_TYPE_RBRACKET, ")");
    parser_consume_type(parser, TOKEN_TYPE_SEMICOLON, ";");

    return function;
}

static struct ast_node *parse_module_fun_invoke(struct parser *parser) {
    if (parser_check_current_type(parser, TOKEN_TYPE_IDENTIFIER) == false) {
        return NULL;
    }

    if (parser_get_next(parser)->type == TOKEN_TYPE_TO == false) {
        return NULL;
    }

    const struct token *module_name = parser_get_current(parser);

    struct ast_node *node_call_module = ast_node_create(AST_NODE_TYPE_CALL_MODULE);

    node_call_module->string_value = module_name->value_string;

    parser_continue(parser);

    parser_continue(parser); // ::

    struct ast_node *node_call = parse_statement(parser);

    list_add(node_call_module->children, node_call);

    return node_call_module;
}

static struct ast_node *parse_empty(struct parser *parser) {
    if (parser_check_current_type(parser, TOKEN_TYPE_SEMICOLON) == false) {
        return NULL;
    }

    parser_continue(parser);

    struct ast_node *empty = ast_node_create(AST_NODE_TYPE_EMPTY);

    return empty;
}

static struct ast_node *parse_statement(struct parser *parser) {
    const parser_func parse_functions[] = {
        parse_variable,

        parse_return,

        parse_func_invoke,
        parse_module_fun_invoke,

        parse_empty
    };

    const size_t count = sizeof(parse_functions) / sizeof(parse_functions[0]);

    for (size_t i = 0; i < count; ++i) {
        const parser_func parse_func = parse_functions[i];

        struct ast_node *node = parse_func(parser);

        if (node == NULL) {
            continue;
        }

        return node;
    }

    printf("Unknown statement at pos %zu\n", parser->index);

    return NULL;
}

static struct ast_node *parse_expression(struct parser *state) {
    if (parser_check_current_type(state, TOKEN_TYPE_INT)) {
        const struct token *token = parser_continue(state);

        struct ast_node *n = ast_node_create(AST_NODE_TYPE_NUMBER);
        n->int_value = token->value_int;

        return n;
    }

    if (parser_check_current_type(state, TOKEN_TYPE_STRING)) {
        struct token *t = parser_continue(state);

        struct ast_node *n = ast_node_create(AST_NODE_TYPE_STRING);
        n->string_value = t->value_string;

        return n;
    }

    if (parser_check_current_type(state, TOKEN_TYPE_IDENTIFIER)) {
        const struct token *token = parser_continue(state);

        struct ast_node *n = ast_node_create(AST_NODE_TYPE_VAR_REF);
        n->name = token->value_string;

        return n;
    }

    fprintf(stderr, "Unknown expression at pos %zu\n", state->index);
    exit(1);
}
