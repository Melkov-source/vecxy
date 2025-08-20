#include "module.h"

void console_log(char *text);
void console_warn(char *text);
void console_error(char *text);

struct module *console_module_create();