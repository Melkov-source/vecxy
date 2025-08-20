#ifndef SCRIPTING_PARSER_UTILS_H
#define SCRIPTING_PARSER_UTILS_H

#include "core/token.h"
#include "common/list.h"
#include <stdio.h>
#include <stdlib.h>

extern const struct list *g_tokens;
extern size_t g_pos;

int is_at_end(void);
struct token *advance(void);

int check(enum token_type type);
int check_kw(enum keyword_type kw);
struct token *consume(enum token_type type, const char *msg);
void consume_kw(enum keyword_type kw, const char *msg);
struct token *peek_next(void);
struct token *peek(void);

#endif //SCRIPTING_PARSER_UTILS_H