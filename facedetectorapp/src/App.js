import React, { Component } from 'react';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import { Helmet } from "react-helmet";

import Navigation from './components/navigation/Navigation';
import Logo from './components/logo/Logo';
import ImageLinkForm from './components/imageLinkForm/ImageLinkForm';
import Rank from './components/rank/Rank';
import FaceRecognition from './components/faceRecognition/FaceRecognition';
import Login from './components/login/Login';
import Register from './components/register/Register';
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
      faceBoxes: [],
      tagList: [],
      route: 'login',
      isSignedIn: false,
      user: {
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: '',
      }
    }
  }

  calculateFaceBoxesLocation = (boxData) => {
    if(boxData.outputs.length > 0){
      const image = document.getElementById('inputimage')
      const width = Number(image.width);
      const height = Number(image.height);

      const faceBoxesArray = boxData.outputs[0].data.regions.map(region => {
        const boxCoords = region.region_info.bounding_box;
        return {
          leftCol: boxCoords.left_col * width,
          topRow: boxCoords.top_row * height,
          rightCol: width - (boxCoords.right_col * width),
          bottomRow: height - (boxCoords.bottom_row * height),
        };
      })
      return faceBoxesArray;
    }
  }

  renderFaceBoxes = (boxes) => {
    this.setState({
      faceBoxes: boxes,
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

  resetState = () => {
    this.setState({
      tagList: [],
      faceBoxes: [],
    });
  }

  onSubmit = () => {
    console.log('Sending: ', this.state.input);
    console.log('Model: ', this.state.model);

    this.resetState();
    this.setState({
      imageUrl: this.state.input,
    })

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
            this.renderFaceBoxes(this.calculateFaceBoxesLocation(response));
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

  onRouteChange = (route) => {
    console.log('Changing route: ', route);
    if(route === 'login') {
      this.setState({
        isSignedIn: false,
        input: '',
        imageUrl: '',
      });
      this.resetState();
    } else if (route === 'home') {
      this.setState({
        isSignedIn: true,
      });
    }
    this.setState({
      route: route,
    });
  }

  loadUser = (user) => {
    this.setState({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        entries: user.entries,
        joined: user.joined,
      }
    })
  }

  render() {

    const {
      isSignedIn,
      route,
      imageUrl,
      faceBoxes,
      tagList
    } = this.state;

    return (
      <div className="App">
        <Helmet>
            <meta charSet="utf-8" />
            <title>My Title</title>
            <link href="https://fonts.googleapis.com/css?family=Josefin+Sans" rel="stylesheet" />
        </Helmet>
        <Particles className='particles'
          params={particlesParams}
        />
        <div className='flex pa4 justify-between'>
          <Logo />
          <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} />
        </div>
        { route === 'home' ?
          <div>
            <Rank name={this.state.user.name} entries={this.state.user.entries}/>
            <ImageLinkForm
              onInputChange={this.onInputChange}
              onSubmit={this.onSubmit}
              onDropdownSelect={this.onModelSelect}
            />
            {
              imageUrl.length > 0 &&
              <div className="flex">
                <FaceRecognition faceBoxes={faceBoxes} imageUrl={imageUrl} />
                {tagList.length > 0 &&
                  <div className="tagsContainer">
                    <h1 className="tagsHeader">Image tags</h1>
                    {tagList.map((tag, index) => {
                      return (
                        <div key={index}>{tag.name}</div>
                      )
                    })}
                  </div>
                }
              </div>
            }
          </div>
          :
          (
            route === 'login' ?
            <Login loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
            :
            <Register  onRouteChange={this.onRouteChange} loadUser={this.loadUser}/>
          )

        }
      </div>
    );
  }
}

export default App;
