import React, { Component } from 'react';
import logo from './logo.svg';
import jonna2 from './jonna2.jpg';
import './App.css';

import * as cocoSsd from '@tensorflow-models/coco-ssd';
import * as tf from '@tensorflow/tfjs';


class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      model: null,
    }

  }

  componentDidMount() {
    this.loadModel();
  }

  /**
   * Function to load the image to be predicted
   */
  loadPicture() {
    return document.getElementById("img");
  }

  /**
   * Function to load the model
   */
  loadModel = async () => {
    const image = this.loadPicture();
    await cocoSsd.load().then(model => {
      this.predict(model, image);
    })
  }

  /**
   * Function to predict what object the model sees in the image
   */
  predict = async (model, image) => {
    await model.detect(image).then(prediciton => {
      console.log(prediciton);
    })
  }

  render() {
    return (
      <div className="App">
        <img id="img" src={jonna2} />
      </div>
    );
  }
}

export default App;
