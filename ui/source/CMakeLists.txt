set(SOURCES
        main.c
)

add_executable(ui ${SOURCES})

target_link_libraries(ui PRIVATE ui_include)