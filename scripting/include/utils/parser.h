#ifndef SCRIPTING_PARSER_UTILS_H
#define SCRIPTING_PARSER_UTILS_H

#include <stdbool.h>
#include <stdio.h>

#include "core/parser.h"
#include "core/token.h"
#include "common/list.h"

static bool parser_is_end(const struct parser *parser) {
    return parser->index >= parser->tokens->count;
}

static struct token *parser_get_current(const struct parser *parser) {
    if (parser->index >= parser->tokens->count) {
        return NULL;
    }

    return list_get((struct list *) parser->tokens, parser->index);
}

static struct token *parser_get_next(const struct parser *parser) {
    if (parser->index + 1 >= parser->tokens->count) {
        return NULL;
    }

    return list_get((struct list *) parser->tokens, parser->index + 1);
}

static struct token *parser_get_back(const struct parser *parser) {
    if (parser->index - 1 <= 0) {
        return NULL;
    }

    return list_get((struct list *) parser->tokens, parser->index - 1);
}

static struct token *parser_continue(struct parser *parser) {
    if (parser_is_end(parser)) {
        return NULL;
    }

    return list_get((struct list *) parser->tokens, parser->index++);
}

static bool parser_check_current_type(const struct parser *parser, const enum token_type type) {
    const struct token *current = parser_get_current(parser);

    return current && current->type == type;
}

static struct token *parser_consume_type(struct parser *parser, const enum token_type type, const char *error_message) {
    const struct token *current = parser_get_current(parser);

    if (current && current->type == type) {
        return parser_continue(parser);
    }

    fprintf(stderr, "Parse error: expected %s at pos %zu\n", error_message, parser->index);
    exit(1);
}

static bool parser_check_keyword(const struct parser *parser, const enum keyword_type keyword) {
    const struct token *current = parser_get_current(parser);

    return current && current->keyword == keyword;
}

static void parser_consume_keyword(struct parser *parser, const enum keyword_type keyword,
                                   const char *error_message) {
    const struct token *current = parser_get_current(parser);

    if (current && current->keyword == keyword) {
        parser_continue(parser);
        return;
    }

    fprintf(stderr, "Parse error: expected keyword %s at pos %zu\n", error_message, parser->index);
    exit(1);
}

#endif //SCRIPTING_PARSER_UTILS_H
