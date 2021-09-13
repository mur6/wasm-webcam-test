#include <fstream>
#include <iostream>
#include <thread>

#include <opencv2/core/core.hpp>
#include <opencv2/imgcodecs.hpp>
#include <opencv2/imgproc.hpp>

#include <emscripten.h>
#include <emscripten/bind.h>


void image_input(int offset, size_t size, int width, int height) {
  uint8_t *pos;
  pos = reinterpret_cast<uint8_t *>(offset);
  auto cv_image = cv::Mat(height, width, CV_8UC4, pos);
  std::cout << "dims: " << cv_image.dims \
    << ", depth(byte/channel):" << cv_image.elemSize1() \
    << ", channels: " << cv_image.channels() << std::endl;
  //Zs_process_result process_result = DoValidateImage2(cv_image, Zs_stepbystep_states::captureHandTop);
}

EMSCRIPTEN_BINDINGS(my_module) {
    emscripten::function("image_input", &image_input);
}
