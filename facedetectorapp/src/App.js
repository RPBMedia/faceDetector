import React, { Component } from 'react';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';

import Navigation from './components/navigation/Navigation';
import Logo from './components/logo/Logo';
import ImageLinkForm from './components/imageLinkForm/ImageLinkForm';
import Rank from './components/rank/Rank';
import FaceRecognition from './components/faceRecognition/FaceRecognition';
import './App.css';

const particlesParams = {
  particles: {
    number: {
      value: 130,
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
    }
  }

  onInputChange = (event) => {
    console.log(event.target.value);
    this.setState({
      input: event.target.value,
    });
  }

  onSubmit = () => {
    console.log('Sending: ', this.state.input);
    this.setState({
      imageUrl: this.state.input,
    });
    app.models.predict(
      Clarifai.FACE_DETECT_MODEL, this.state.input)
      .then(
        function(response) {
          // do something with response
          console.log(response.outputs[0].data.regions[0].region_info.bounding_box);
        },
        function(err) {
          // there was an error
        }
      );
  }

  render() {
    return (
      <div className="App">
        <Particles className='particles'
          params={particlesParams}
        />
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm
          onInputChange={this.onInputChange}
          onSubmit={this.onSubmit}
        />
        {this.state.imageUrl.length > 0 &&
          <FaceRecognition imageUrl={this.state.imageUrl} />
        }
      </div>
    );
  }
}

export default App;
