# Object detection with Tensorflow
Uses a pretrained deep learning model from Tensorflow to detect real time object through the webcam.  

## Things learned
* Better to use requestAnimationFrame than setInterval to loop through the video frames - Pros, more smoother and quicker to predict objects.

## Demo
Demo can be found at: https://glasspinna.github.io/Object-detection-Tensorflow/

* It can take some time for the deep learning model to get loaded
* Can be tested on mobile, tablet and computer
* Can be a bit laggy depending how good GPU your device have.