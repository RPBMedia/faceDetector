import React, { Component } from 'react';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';

import Navigation from './components/navigation/Navigation';
import Logo from './components/logo/Logo';
import ImageLinkForm from './components/imageLinkForm/ImageLinkForm';
import Rank from './components/rank/Rank';
import FaceRecognition from './components/faceRecognition/FaceRecognition';
import Login from './components/login/Login';
import './App.css';

const particlesParams = {
  particles: {
    number: {
      value: 60,
      density: {
        enable: true,
        value_area: 800,
      }
    }
  }
};

const app = new Clarifai.App({
 apiKey: 'f82243a424b74d87bde857025d8438a6'
});

class App extends Component {

  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: '',
      model: {
        value: 'FACE_DETECT_MODEL',
        label: 'Face detection Model',
      },
      faceBox: {},
      tagList: [],
      route: 'login'
    }
  }

  calculateFaceBoxLocation = (boxData) => {
    if(boxData.outputs.length > 0){
      const boxCoords = boxData.outputs[0].data.regions[0].region_info.bounding_box;
      const image = document.getElementById('inputimage')
      const width = Number(image.width);
      const height = Number(image.height);
      return {
        leftCol: boxCoords.left_col * width,
        topRow: boxCoords.top_row * height,
        rightCol: width - (boxCoords.right_col * width),
        bottomRow: height - (boxCoords.bottom_row * height),
      }
    }
  }

  renderFaceBox = (box) => {
    this.setState({
      faceBox: box,
    })
    console.log('Face box set: ', this.state.faceBox);
  }

  calculateTagList = (generalData) => {
    return generalData.outputs[0].data.concepts;
  }

  renderTagList = (tags) => {
    this.setState({
      tagList: tags,
    })
    console.log('Image tags: ', JSON.stringify(this.state.tagList));
  }

  onInputChange = (event) => {
    console.log(event.target.value);
    this.setState({
      input: event.target.value,
    });
  }

  onSubmit = () => {
    console.log('Sending: ', this.state.input);
    console.log('Model: ', this.state.model);


    this.setState({
      imageUrl: this.state.input,
      tagList: [],
      faceBox: {},
    });
    const selectedModel = this.state.model.value;

    app.models.predict(
      Clarifai[selectedModel], this.state.input)
      .then((response) => {
          // do something with response
          if (selectedModel === 'GENERAL_MODEL') {
            console.log(response.outputs[0].data.concepts);
            this.renderTagList(this.calculateTagList(response));
          } else {
            console.log(response.outputs[0].data.regions[0].region_info.bounding_box);
            this.renderFaceBox(this.calculateFaceBoxLocation(response));
          }
        })
        .catch(err => console.log(err));
  }

  onModelSelect = (item) => {
    console.log(item);
    this.setState({
      model: item,
    });
  }

  render() {

    return (
      <div className="App">
        <Particles className='particles'
          params={particlesParams}
        />
        <div className='flex pa4 justify-between'>
          <Logo />
          <Navigation />
        </div>
        { this.state.route === 'login' ?
          <Login />
          :
          <div>
            <Rank />
            <ImageLinkForm
              onInputChange={this.onInputChange}
              onSubmit={this.onSubmit}
              onDropdownSelect={this.onModelSelect}
            />
            {
              this.state.imageUrl.length > 0 &&
              <div className="flex">
                <FaceRecognition faceBox={this.state.faceBox} imageUrl={this.state.imageUrl} />
                {this.state.tagList.length > 0 &&
                  <div className="tagsContainer">
                    <h1 className="tagsHeader">Image tags</h1>
                    {this.state.tagList.map((tag, index) => {
                      return (
                        <div key={index}>{tag.name}</div>
                      )
                    })}
                  </div>
                }
              </div>
            }
          </div>
        }
      </div>
    );
  }
}

export default App;
