set(SOURCES
        main.c

        #core
        core/lexer.c
        core/parser.c
        core/token.c
        core/module.c

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

        core/interpreter.c
        core/parser_utils.c
)

add_executable(scripting ${SOURCES})

target_link_libraries(scripting PRIVATE scripting_include)