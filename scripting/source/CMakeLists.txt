set(SOURCES
        main.c

        #core
        core/lexer.c
        core/parser.c
        core/token.c
        core/module.c
        core/ast.c
        core/interpreter.c
        core/var.c
        core/runtime.c

        #entities
        core/fn.c
        core/pack.c
        core/scope.c

        #common
        common/file.c
        common/list.c

        #modules
        modules/console.c
        modules/math.c
        core/environment.c
)

add_executable(scripting ${SOURCES})

target_link_libraries(scripting PRIVATE scripting_include)