import React, { Component } from 'react';
import './App.css';
import * as cocoSsd from '@tensorflow-models/coco-ssd';
import '@tensorflow/tfjs';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      model: undefined,
      track: null,
      req: null,
      context: undefined,
      isWebcam: false,
      isLoaded: false,
    }

  }

  componentDidMount() {
    this.initCanvas();
  }

  /**
   * Function to load the the model
   */
  initModel = async () => {
    this.setState({
      model: await this.loadModel()
    });

    if (this.state.model !== undefined) {
      this.setState({ isLoaded: true })
    }
  }

  /**
   * Function to init the webcam and stream to the video tag
   */
  initWebcam = () => {
    const video = document.getElementById("webcam");
    this.streamVideo(video, this.state.model);

    this.setState({ isWebcam: true })
  }

  /**
   * Function to init the canvas 
   */
  initCanvas() {
    const context = document.getElementById("canvas").getContext("2d");

    this.setState({
      context: context
    });
  }

  /**
   * Function to load the model
   */
  loadModel = async () => {
    return await cocoSsd.load();
  }

  /**
   * Function to stop webcam
   */
  stopWebcam = () => {
    this.state.track.stop();
  }

  /**
   * Function to stop the model from predicting from the webcam
   */
  stopModel = () => {
    cancelAnimationFrame(this.state.req);
  }

  /**
   * Function to stream the video to the model
   * @param {*} video - The video to be streamed
   * @param {*} model - The loaded deep learning model, which is used to predict the objects 
   */
  streamVideo(video, model) {
    const constrains = { video: { facingMode: 'user', width: 400, height: 400 } };

    if (navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia(constrains)
        .then(mediaStream => {

          video.srcObject = mediaStream;

          const track = mediaStream.getTracks()[0];
          this.setState({ track: track });

          video.onloadedmetadata = () => {
            this.predictObject(video, model);
          }
        })
        .catch(error => {
          console.log(error.message);
        })
    }
  }

  /**
   * Function to predict what object the model sees in the image
   */
  predictObject = async (image, model) => {
    model.detect(image).then(predictions => {

      if (this.state.isWebcam) {
        console.log((predictions))

        const myReq = requestAnimationFrame(() => {
          this.predictObject(image, model)
        })

        this.setState({ req: myReq })
      }

      this.drawRectangle(predictions);
    })
  }

  /**
   * Function thats draws a rectangle around the detected object
   * @param {*} prediciton 
   */
  drawRectangle(prediction) {
    const context = this.state.context;

    if (this.state.isWebcam) context.clearRect(0, 0, 400, 400);

    for (let i = 0; i < prediction.length; i++) {
      const coordinates = this.getCoordinates(prediction[i]);
      const objectInfo = this.getObjectInfo(prediction[i]);

      context.beginPath();
      context.fillText(objectInfo, coordinates[0], coordinates[1] - 10);
      context.rect(coordinates[0], coordinates[1], coordinates[2], coordinates[3]);
      context.stroke();
    }

  }

  /**
   * Function to get the name and the estimated prediciton accuarcy on the detected object
   * @param {*} prediciton 
   */
  getObjectInfo(prediciton) {
    return prediciton.class + " " + prediciton.score;
  }

  /**
   * Function to get the coordinates for where on the image the object that is detected
   * Is needed to be able to draw a rectangle around the detected object
   * @param {*} prediciton 
   */
  getCoordinates(prediciton) {
    return prediciton.bbox;
  }


  /**
   * Functions thats reads the function and turns the file into an image
   */
  readFileAsPicture = () => {
    this.setState({ isWebcam: false })

    const fileReader = new FileReader();
    let image = new Image();

    fileReader.readAsDataURL(document.getElementById("uploader").files[0]);

    fileReader.onload = function (event) {
      document.getElementById("canvas").src = event.target.result;
      image.src = event.target.result;
    }

    image.onload = () => {
      this.drawImageOnCanvas(image, this.state.context);
    }
  }

  /**
   * Function to draw the user's selected image onto the canvas
   * when the image is loaded onto the canvas the object detection starts
   */
  drawImageOnCanvas = (image, context) => {
    context.drawImage(image, 0, 0, 400, 400);

    const imageData = context.getImageData(0, 0, 400, 400);

    if (this.state.model !== undefined) {
      this.predictObject(imageData, this.state.model)
    }
  }


  render() {
    return (
      <div className="App">
        <div className="video-container">
          <canvas id="canvas" width="400" height="400" />
          <video autoPlay muted width="400" height="400" id="webcam" />
        </div>

        <button id="btnStop" onClick={this.stopWebcam} disabled={!this.state.isLoaded}>Stop Camera</button>
        <button id="btnStopModel" onClick={this.stopModel} disabled={!this.state.isLoaded}>Stop Model</button>
        <button id="btnStartWebcam" onClick={this.initWebcam} disabled={!this.state.isLoaded}>Start Webcam</button>
        <button id="btnStartWbcam" onClick={this.initModel} disabled={this.state.isLoaded}>Load Model</button>
        <input id="uploader" type="file" accept="image/*" onChange={this.readFileAsPicture} disabled={!this.state.isLoaded} />
      </div>
    );
  }
}

export default App;
