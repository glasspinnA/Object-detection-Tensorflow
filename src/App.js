import React, { Component } from 'react';
import './App.css';
import * as cocoSsd from '@tensorflow-models/coco-ssd';
import '@tensorflow/tfjs';

import Picture from "./Picture.js"

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      model: undefined,
      track: null,
      req: null,
      canvas: null,
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
  initWebcam = async (model) => {
    const video = document.getElementById("webcam");
    this.streamVideo(video, model);

    this.setState({ isWebcam: true })
  }

  /**
   * Function to init the canvas 
   */
  initCanvas() {
    const canvas = document.getElementById("canvas");
    const context = canvas.getContext("2d");

    this.setState({
      context: context
    });
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

          video.onloadedmetadata = () => {
            this.predictObject(video, model);
          }

          const track = mediaStream.getTracks()[0];
          this.setState({ track: track });
        })
        .catch(error => {
          console.log(error.message);
        })
    }
  }


  /**
   * Function thats draws a rectangle around the detected object
   * @param {*} prediciton 
   */
  drawRectangle(prediction) {
    const context = this.state.context;

    if (this.state.isWebcam) context.clearRect(0, 0, 400, 400);

    try {

      for (let i = 0; i < prediction.length; i++) {
        const coordinates = this.getCoordinates(prediction[i]);
        const objectName = this.getObjectName(prediction[i]);

        context.beginPath();
        context.fillText(objectName, coordinates[0], coordinates[1] - 10);
        context.rect(coordinates[0], coordinates[1], coordinates[2], coordinates[3]);
        context.stroke();

      }
    } catch (error) {
      console.log(error);

    }
  }

  /**
   * Function to get the name of the object that is predicted
   * @param {*} prediciton 
   */
  getObjectName(prediciton) {
    try {
      return prediciton.class;
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * Function to get coordinates for the object that is predicted 
   * @param {*} prediciton 
   */
  getCoordinates(prediciton) {
    try {
      return prediciton.bbox;
    }
    catch (error) {
      console.log(error);
    }


  }

  /**
   * Function to load the model
   */
  loadModel = async () => {
    return await cocoSsd.load();
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
   * Function to stop webcam
   */
  stopWebcam = () => {
    this.state.track.stop();
  }

  /**
   * Function to stop the model from predicting
   */
  stopModel = () => {
    cancelAnimationFrame(this.state.req);
  }


  uploadPictures = () => {
    this.setState({ isWebcam: false })
    const fileReader = new FileReader();
    const context = this.state.context;
    fileReader.readAsDataURL(document.getElementById("uploader").files[0]);


    let image = new Image();

    fileReader.onload = function (event) {
      document.getElementById("canvas").src = event.target.result;
      image.src = event.target.result;
    }


    if (this.state.context)

      image.onload = () => {
        this.state.context.drawImage(image, 0, 0, 400, 400);
        let imageData = context.getImageData(0, 0, 400, 400);
        console.log(imageData);

        if (this.state.model !== undefined) {
          this.predictObject(imageData, this.state.model)
        }
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
        <button id="btnStartWebcam" onClick={this.initModel} disabled={this.state.isLoaded}>Load Model</button>
        <input id="uploader" type="file" onChange={this.uploadPictures} disabled={!this.state.isLoaded} />
      </div>
    );
  }
}

export default App;
