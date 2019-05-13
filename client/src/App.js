import React, { Component } from 'react';
import { connect } from 'react-redux'

import { appActions } from './core/app'

import logo from './logo.svg';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
  }

  initKeyPress() {
    const { command } = this.props;
    document.addEventListener('keypress', (e) => {
      switch(e.code) {
        case 'KeyW': command("forward"); break;
        case 'KeyA': command("left"); break;
        case 'KeyD': command("right"); break;
        case 'KeyS': command("lift"); break;
        default: console.log(e.code)
      }
    })
  }
  

  componentDidMount() {
    this.initKeyPress()
    const { connectToServer } = this.props;
    connectToServer(window.location.href);
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
    const {message, test, command} = this.props;
    return (
      <div className="App">
        <div className="container">
          <div className="content">
            <div id="videoContainer" >
              <video id="video" width="100%" height="100%" autoPlay></video>
            </div>
            <div className="direction">
              <div className="level1">
                <button className="straightDirection" onClick={() => command("forward")}><i className="glyphicon glyphicon-arrow-up"></i></button>
              </div>
              <div className="level2">
                <button className="turnDirection" onClick={() => command("left")}><i className="glyphicon glyphicon-share-alt turn-left"></i></button>
                <button className="center" onClick={() => command("stop")}><i className="glyphicon glyphicon-play"></i></button>
                <button className="turnDirection" onClick={() => command("right")}><i className="glyphicon glyphicon-share-alt"></i></button>
              </div>
              <div className="level3">
                <button className="straightDirection" onClick={() => command("lift")}><i className="glyphicon glyphicon-arrow-down"></i></button>
                <button className="straightDirection" onClick={() => command("drop")}><i className="glyphicon glyphicon-arrow-down"></i></button>
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
  test: appActions.test,
  connectToServer: appActions.connectToServer,
  command: appActions.command
}

App = connect (
	mapStateToProps,
	mapDispatchToProps
) ( App )

export default App;
