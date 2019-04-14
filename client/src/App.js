import React, { Component } from "react";
// import SimpleStorageContract from "./contracts/SimpleStorage.json";
import FaceRecognitionContract from "./contracts/FaceRecognition.json";
import getWeb3 from "./utils/getWeb3";
import Particles from 'react-particles-js';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import "./App.css";

const Clarifai = require('clarifai');

//You must add your own API key here from Clarifai.
const clarifaiApp = new Clarifai.App({
 apiKey: 'a52bb4fb84b04380adbf751c628fec91'
});


const particlesOptions = {
  particles: {
    number: {
      value: 30,
      density: {
        enable: true,
        value_area: 800
      }
    }
  }
}

const initialState = {
  input: '',
  imageUrl: '',
  boxes: [],
  route: 'home',
  storageValue: 0,
  web3: null, 
  accounts: null, 
  contract: null,
  entries: 0,
  isEnrolled: false,
  mostImages: ''
}
class App extends Component {
  state = { storageValue: 0, web3: null, accounts: null, contract: null };
  constructor() {
    super();
    this.state = initialState;
  }
  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();
      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();
      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = FaceRecognitionContract.networks[networkId];
      const instance = new web3.eth.Contract(
        FaceRecognitionContract.abi,
        deployedNetwork && deployedNetwork.address,
      );

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      const hasDonated = await instance.methods.hasDonated().call({from: accounts[0]});
      const mostImages = await instance.methods.getMostImages().call({from: accounts[0]});
      if (hasDonated) {
         const countImages = await instance.methods.getCountImagesFor().call({from: accounts[0]});
         console.log(countImages)
         this.setState({entries: countImages.toNumber()});
      }
      
      this.setState({ web3, accounts, contract: instance, route: 'home', isEnrolled: hasDonated, mostImages }, () => {

      });
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  calculateFaceLocation = (data) => {
    const boxes = [];
    if (!data || !data.outputs) {
      return boxes;
    }
    const image = document.getElementById('inputimage');
    for (let box of data.outputs[0].data.regions) {
      const clarifaiFace = box.region_info.bounding_box;
      const width = Number(image.width);
      const height = Number(image.height);
      const boxData = {
        leftCol: clarifaiFace.left_col * width,
        topRow: clarifaiFace.top_row * height,
        rightCol: width - (clarifaiFace.right_col * width),
        bottomRow: height - (clarifaiFace.bottom_row * height)
      };
      boxes.push(boxData);
    }
    return boxes;
  }

  displayFaceBox = (boxes) => {
    console.log(boxes)
    this.setState({boxes: boxes});
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  onButtonSubmit = async () => {
    this.setState({imageUrl: this.state.input})
    const data = await clarifaiApp.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
    let newCount = await this.state.contract.methods.getCountImagesFor().call({from: this.state.accounts[0]});
    console.log(this.state.contract);
    this.displayFaceBox(this.calculateFaceLocation(data));
    const detectedFaces = data.outputs[0].data.regions.length;
    this.state.contract.methods.registerImage(detectedFaces).send({from: this.state.accounts[0]});
    this.setState({entries:newCount.toNumber() + detectedFaces});
  }

  onActionClicked = (action) => {
    if (action === "donate") {
      this.onDonate();
    } else {
      this.onEnroll();
    }
  }

  onDonate = () => {

  }
  onEnroll = async () => {
    await this.setState({isEnrolled: true}, async () => {
      await this.state.contract.methods.enroll().send({from: this.state.accounts[0], value: 1});
    });
  }

  render() {
    const { imageUrl, boxes, isEnrolled } = this.state;
    return (
      <div className="App">
         <Particles className='particles' params={particlesOptions} />
        <Navigation onActionClicked={this.onActionClicked} isEnrolled={isEnrolled} />
          <div>
              <Logo />
              <p className='f2'>
                {`Best of them all is the address: ${this.state.mostImages}`}
              </p>
              {this.state.isEnrolled && `You have detected ${this.state.entries} images`}
              <p className='f3'>
                {'This Magic Brain will detect faces in your pictures. Give it a try.'}
              </p>
              { this.state.isEnrolled &&
              <div>
                <ImageLinkForm
                  onInputChange={this.onInputChange}
                  onButtonSubmit={this.onButtonSubmit}
                />
                <FaceRecognition boxes={boxes} imageUrl={imageUrl} />
              </div>
            }
            </div>
      </div>
    );
  }
}

export default App;
