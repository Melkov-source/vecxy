set(SOURCES
        #io
        io/file.c

        #collections
        collections/list.c

        string.c
)

add_library(clib STATIC ${SOURCES})

target_link_libraries(clib PUBLIC clib_include)
target_include_directories(clib PUBLIC ${CMAKE_CURRENT_SOURCE_DIR})