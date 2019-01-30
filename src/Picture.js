import React, { Component } from 'react';
import './App.css';

class Picture extends Component {

    constructor(props) {
        super(props);

        this.state = {
        }
    }

    loadModel() {
        alert("hej")
    }

    uploadPictures = () => {
        const fileReader = new FileReader();
        const canvas = document.getElementById("image");
        const context = canvas.getContext("2d");

        fileReader.readAsDataURL(document.getElementById("uploader").files[0]);


        let image = new Image();


        image.onload = function () {
            context.drawImage(image, 0, 0, 400, 400);
        }

        fileReader.onload = function (event) {
            document.getElementById("image").src = event.target.result;
            image.src = event.target.result;
        }
    }



    render() {
        return (
            <div>
                <h1>Hello</h1>
                <div className="canvas-wrapper">
                    <canvas id="image" width="400" height="400" />
                </div>
                <input id="uploader" type="file" onChange={this.uploadPictures} />
            </div>
        );
    }
}

export default Picture;
