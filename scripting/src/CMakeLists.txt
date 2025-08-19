add_executable(scripting
        main.c
        core/lexer.c
        common/file.c
        common/file.h
        core/parser.c
        core/parser.h
        core/script.c
        core/script.h
        core/interpreter.c
        core/interpreter.h
        core/ast.h
        core/config.h
        core/module.c
        core/module.h
        core/box.c
        core/box.h
)

target_include_directories(scripting PRIVATE
        ${CMAKE_CURRENT_SOURCE_DIR}/core
        ${CMAKE_CURRENT_SOURCE_DIR}/utils
)