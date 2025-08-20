add_library(scripting_include INTERFACE
        core/interpreter.h
        core/parser_utils.h
        core/ast.h)

target_include_directories(scripting_include INTERFACE ${CMAKE_CURRENT_SOURCE_DIR})