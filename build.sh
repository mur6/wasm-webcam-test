source "/Users/taichi.muraki/workspace/Cpp/emsdk/emsdk_env.sh"
pushd build
emcmake cmake -DOpenCV_DIR=/Users/taichi.muraki/workspace/Cpp/build_wasm_no_bulk_memory ../src
emmake make
popd
cp build/main.js build/main.wasm dist/
