import React, { Component } from 'react';
import { connect } from 'react-redux'
// import io from 'socket.io-client'
import Websocket from 'react-websocket';

import { appActions } from '../core/app'

class MainDisplay extends Component {

  constructor(props) {
    super(props);

    this.state = {
        imgSrc: "",
        ws: {}
    }
  }

  initKeyPress() {
    const { command } = this.props;
    document.addEventListener('keypress', (e) => {
      switch(e.code) {
        case 'KeyW': command("forward"); break;
        case 'KeyA': command("left"); break;
        case 'KeyD': command("right"); break;
        case 'KeyS': command("stop"); break;
        default: console.log(e.code)
      }
    })
  }


  componentDidMount() {
    this.initKeyPress()
    const { connectToServer } = this.props;
    connectToServer(window.location.href);
    const WS_URL = window.location.origin.replace(/^http/, 'ws');
    // const FPS = 10;
    const ws = new WebSocket(WS_URL);

    this.setState({ws})
    const img = document.querySelector('img#video');
    ws.onopen = () => console.log(`Connected to ${WS_URL}`);
    ws.onmessage = message => {
        // set the base64 string to the src tag of the image
        // img.src = message.data;
        // console.log("src: ", message.data)
        // this.setState({imgSrc: message.data})
        img.src = message.data
    }
  }

  componentWillUnmount() {
    this.state.ws.close()
  }

  render() {
    const {message, command} = this.props;
    return (
      <div className="App">
        <div className="container">
          <div className="content">
            <div id="videoContainer" >
              {/* <video id="video" width="100%" height="100%" autoPlay></video> */}
              <img id="video" width="100%" height="100%" src={this.state.imgSrc} alt=""></img>
            </div>
            <div style={{textAlign: "center", color: "red"}}>{message}</div>
            <div className="direction">
              <div className="level1">
                <button className="straightDirection" onClick={() => command("forward")}><i className="glyphicon glyphicon-arrow-up"></i></button>
              </div>
              <div className="level2">
                <button className="turnDirection" onClick={() => command("left")}><i className="glyphicon glyphicon-share-alt turn-left"></i></button>
                <button className="center" onClick={() => command("stop")}><i className="glyphicon glyphicon-stop"></i></button>
                <button className="turnDirection" onClick={() => command("right")}><i className="glyphicon glyphicon-share-alt"></i></button>
              </div>
              <div className="level3">
                <button className="straightDirection" onClick={() => command("backward")}><i className="glyphicon glyphicon-arrow-down"></i></button>
              </div>
              <div className="level3">
                <button className="straightDirection" onClick={() => command("lift")}><i className="glyphicon glyphicon-upload"></i></button>
                <button className="straightDirection" onClick={() => command("drop")}><i className="glyphicon glyphicon-download"></i></button>
                <button className="straightDirection" onClick={() => command("auto")}><i className="glyphicon glyphicon-font"></i></button>
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

MainDisplay = connect (
	mapStateToProps,
	mapDispatchToProps
) ( MainDisplay )

export default MainDisplay;
