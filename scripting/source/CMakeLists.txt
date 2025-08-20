set(SOURCES
        main.c

        #core
        core/lexer.c
        core/parser.c
        core/token.c
        core/module.c
        core/ast.c
        core/interpreter.c

        #entities
        core/entities/fn.c
        core/entities/pack.c
        core/entities/scope.c

        #common
        common/file.c
        common/list.c

        #modules
        modules/console.c
        modules/math.c
)

add_executable(scripting ${SOURCES})

target_link_libraries(scripting PRIVATE scripting_include)