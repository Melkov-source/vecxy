add_executable(scripting
        main.c
        core/lexer.c
        utils/list.c
        common/file.c
        common/file.h
        core/parser.c
        core/parser.h
        core/script.c
        core/script.h
        core/interpreter.c
        core/interpreter.h
        core/ast.h
)

target_include_directories(scripting PRIVATE
        ${CMAKE_CURRENT_SOURCE_DIR}/core
        ${CMAKE_CURRENT_SOURCE_DIR}/utils
)