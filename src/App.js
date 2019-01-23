import React, { Component } from 'react';
import jonna2 from './jonna2.jpg';
import './App.css';

import * as cocoSsd from '@tensorflow-models/coco-ssd';
import '@tensorflow/tfjs';


class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      model: null,
      track: null,
      req: null,
    }

  }

  componentDidMount = async () => {
    const model = await this.loadModel();
    this.initWebcam(model);
  }

  /**
   * Function to init the webcam and stream to the video tag
   */
  initWebcam = async (model) => {
    const video = document.getElementById("webcam");
    this.streamVideo(video, model);
  }

  /**
   * Function to stream the video to the model
   * @param {*} video - The video to be streamed
   * @param {*} model - The loaded deep learning model, which is used to predict the objects 
   */
  streamVideo(video, model) {
    const constrains = { video: { facingMode: 'user' } };

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
      console.log(JSON.stringify(predictions));
      const myReq = requestAnimationFrame(() => {
        this.predictObject(image, model)
      })

      this.setState({ req: myReq })
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


  render() {
    return (
      <div className="App">
        <video autoPlay muted width="400" height="400" id="webcam" />
        <canvas width="400" height="400" />
        <button id="btnStop" onClick={this.stopWebcam}>Stop Camera</button>
        <button id="btnStopModel" onClick={this.stopModel}>Stop Model</button>
      </div>
    );
  }
}

export default App;
