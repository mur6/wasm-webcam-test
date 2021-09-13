function passToWasm(module, uint8ArrData, width, height) {
    // copying the uint8ArrData to the heap
    const numBytes = uint8ArrData.length * uint8ArrData.BYTES_PER_ELEMENT;
    const dataPtr = module._malloc(numBytes);
    const dataOnHeap = new Uint8Array(module.HEAPU8.buffer, dataPtr, numBytes);
    dataOnHeap.set(uint8ArrData);
    // calling the Wasm function
    console.log(dataOnHeap.byteOffset);
    module.image_input(dataOnHeap.byteOffset, uint8ArrData.length, width, height);
}

export function sendImageData(module, canvas) {
    const context = canvas.getContext('2d');
    const { width } = canvas;
    const { height } = canvas;
    if (width === 0 || height === 0) {
        return;
    }
    console.log(canvas, canvas.width, canvas.height);
    const imgData = context.getImageData(0, 0, canvas.width, canvas.height);
    const uint8ArrData = new Uint8Array(imgData.data);

    //const ctx = document.getElementById("canvas2").getContext('2d');
    //ctx.putImageData(imgData, 0, 0);

    // // pass the width and height too !!
    passToWasm(module, uint8ArrData, imgData.width, imgData.height);
}
