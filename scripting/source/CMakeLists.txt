set(SOURCES
    main.c
    test.c
)

add_executable(scripting ${SOURCES})

target_link_libraries(scripting PRIVATE scripting_include)