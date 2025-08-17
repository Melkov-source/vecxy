#include "core/interpreter.h"

int main(void) {
    const struct script *script = script_create("E:\\Projects\\vecxy\\scripting\\scripts\\test.ms");

    const int result = interpreter_execute(script);

    return result;
}
