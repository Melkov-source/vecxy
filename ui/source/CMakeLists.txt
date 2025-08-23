set(SOURCES
        main.c

        uhtml.c
)

add_executable(ui ${SOURCES})

target_link_libraries(ui PRIVATE ui_include)
target_link_libraries(ui PRIVATE clib)