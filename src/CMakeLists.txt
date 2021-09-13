cmake_minimum_required(VERSION 3.10.2)

project(wasm_webcam_test)

set(CMAKE_CXX_STANDARD 14)
set(CMAKE_POSITION_INDEPENDENT_CODE ON)
#set(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} -g --bind -s DEMANGLE_SUPPORT=1 -s ALLOW_MEMORY_GROWTH=1 -s MODULARIZE=1 -s EXPORT_ES6=1 --embed-file zozo_shoe_data/")
set(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} -g --bind  -s ALLOW_MEMORY_GROWTH=1 -s MODULARIZE=1 -s EXPORT_ES6=1")

find_package(OpenCV 3 REQUIRED)

include_directories(
    ${OpenCV_INCLUDE_DIRS}
)

add_executable(main main.cpp)
target_link_libraries(main  ${OpenCV_LIBS})
