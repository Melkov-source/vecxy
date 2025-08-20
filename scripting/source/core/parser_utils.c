#include "core/parser_utils.h"

#include <stdio.h>

const struct list *g_tokens = NULL;
size_t g_pos = 0;

struct token *peek(void) {
    if (g_pos >= g_tokens->count) return NULL;
    return (struct token*)list_get((struct list*)g_tokens, g_pos);
}
struct token *peek_next(void) {
    if (g_pos + 1 >= g_tokens->count) return NULL;
    return (struct token*)list_get((struct list*)g_tokens, g_pos+1);
}

struct token *peek_back(void) {
    if (g_pos - 1 <= 0) return NULL;
    return (struct token*)list_get((struct list*)g_tokens, g_pos - 1);
}

int is_at_end(void) { return g_pos >= g_tokens->count; }
struct token *advance(void) { return !is_at_end() ? (struct token*)list_get((struct list*)g_tokens, g_pos++) : NULL; }
int check(enum token_type type) { struct token *t = peek(); return t && t->type == type; }
int check_kw(enum keyword_type kw) { struct token *t = peek(); return t && t->keyword == kw; }

struct token *consume(enum token_type type, const char *msg) {
    struct token *t = peek();
    if (t && t->type == type) return advance();
    fprintf(stderr, "Parse error: expected %s at pos %zu\n", msg, g_pos);
    exit(1);
}

void consume_kw(enum keyword_type kw, const char *msg) {
    struct token *t = peek();
    if (t && t->keyword == kw) { advance(); return; }
    fprintf(stderr, "Parse error: expected keyword %s at pos %zu\n", msg, g_pos);
    exit(1);
}