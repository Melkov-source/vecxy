cmake_minimum_required(VERSION 4.0)
project(scripting C)

set(CMAKE_C_STANDARD 11)

add_executable(scripting
        main.c
        core/lexer.c
        core/lexer.h
        core/token.c
        core/token.h
        utils/list.c
        utils/list.h)
