#ifndef SCRIPTING_PARSER_UTILS_H
#define SCRIPTING_PARSER_UTILS_H

#include <stdbool.h>
#include <stdio.h>

#include "core/parser.h"
#include "core/token.h"
#include "common/list.h"

static bool parser_is_at_end(const struct parser_state *p_parser_state) {
    return p_parser_state->index >= p_parser_state->tokens->count;
}

static struct token *parser_get_current(const struct parser_state *p_parser_state) {
    if (p_parser_state->index >= p_parser_state->tokens->count) {
        return NULL;
    }

    return list_get((struct list *) p_parser_state->tokens, p_parser_state->index);
}

static struct token *parser_get_next(const struct parser_state *p_parser_state) {
    if (p_parser_state->index + 1 >= p_parser_state->tokens->count) {
        return NULL;
    }

    return list_get((struct list *) p_parser_state->tokens, p_parser_state->index + 1);
}

static struct token *parser_get_back(const struct parser_state *p_parser_state) {
    if (p_parser_state->index - 1 <= 0) {
        return NULL;
    }

    return list_get((struct list *) p_parser_state->tokens, p_parser_state->index - 1);
}

static struct token *parser_continue(struct parser_state *p_parser_state) {
    if (parser_is_at_end(p_parser_state)) {
        return NULL;
    }

    return list_get((struct list *) p_parser_state->tokens, p_parser_state->index++);
}

static bool parser_check_current_type(const struct parser_state *p_parser_state, const enum token_type type) {
    const struct token *current = parser_get_current(p_parser_state);

    return current && current->type == type;
}

static struct token *parser_consume_type(struct parser_state *p_parser_state, const enum token_type type,
                                         const char *error_message) {
    const struct token *current = parser_get_current(p_parser_state);

    if (current && current->type == type) {
        return parser_continue(p_parser_state);
    }

    fprintf(stderr, "Parse error: expected %s at pos %zu\n", error_message, p_parser_state->index);
    exit(1);
}

static bool parser_check_keyword(const struct parser_state *p_parser_state, const enum keyword_type keyword) {
    const struct token *current = parser_get_current(p_parser_state);

    return current && current->keyword == keyword;
}

static void parser_consume_keyword(struct parser_state *p_parser_state, const enum keyword_type keyword,
                                   const char *error_message) {
    const struct token *current = parser_get_current(p_parser_state);

    if (current && current->keyword == keyword) {
        parser_continue(p_parser_state);
        return;
    }

    fprintf(stderr, "Parse error: expected keyword %s at pos %zu\n", error_message, p_parser_state->index);
    exit(1);
}

#endif //SCRIPTING_PARSER_UTILS_H
