import React, { Component } from 'react';
import { connect } from 'react-redux'

import { appActions } from './core/app'

import logo from './logo.svg';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
  }
  

  componentDidMount() {
    console.log("component will mount")
    const video = document.getElementById('video');
    console.log("video: ", video);
    if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true}).then( (stream) => {
        if(stream) {
          video.srcObject = stream;
          video.play()
        }
      })
    }
  }

  render() {
    const {message, test} = this.props;
    console.log("render")
    return (
      <div className="App">
        <div className="container">
          <div className="content">
            <div id="videoContainer" >
              <video id="video" width="100%" height="100%" autoPlay></video>
            </div>
            <div className="direction">
              <div className="level1">
                <button className="straightDirection"><i className="glyphicon glyphicon-arrow-up"></i></button>
              </div>
              <div className="level2">
                <button className="turnDirection"><i className="glyphicon glyphicon-share-alt turn-left"></i></button>
                <button className="center"><i className="glyphicon glyphicon-play"></i></button>
                <button className="turnDirection"><i className="glyphicon glyphicon-share-alt"></i></button>
              </div>
              <div className="level3">
                <button className="straightDirection"><i className="glyphicon glyphicon-arrow-down"></i></button>
              </div>
            </div>

            <div className="information"></div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    message: state.app.message
  }
}

const mapDispatchToProps = {
  test: appActions.test
}

App = connect (
	mapStateToProps,
	mapDispatchToProps
) ( App )

export default App;
