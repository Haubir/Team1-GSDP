import React, { Component } from 'react';
import { connect } from 'react-redux'
import io from 'socket.io-client'

import { appActions } from '../../core/app'

class Main extends Component {

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
        case 'KeyS': command("stop"); break;
        default: console.log(e.code)
      }
    })
  }


  componentDidMount() {
    this.initKeyPress()
    const { connectToServer } = this.props;
    connectToServer(window.location.href);

    const socket = io.connect("localhost:8080")

    const peerConnection = window.RTCPeerConnection ||
    window.mozRTCPeerConnection ||
    window.webkitRTCPeerConnection ||
    window.msRTCPeerConnection;

    const sessionDescription = window.RTCSessionDescription ||
    window.mozRTCSessionDescription ||
    window.webkitRTCSessionDescription ||
    window.msRTCSessionDescription;

    navigator.getUserMedia = navigator.getUserMedia ||
    navigator.webkitGetUserMedia ||
    navigator.mozGetUserMedia ||
    navigator.msGetUserMedia;

    const pc2 = new peerConnection({"iceServers":[{"url": "stun:stun.l.google.com:19302"}]})

    const video = document.getElementById('video');

    pc2.onaddstream = function(obj) {
      console.log("on add stream")
      video.srcObject = obj.stream;
      video.play()
    }

    socket.on("offer-made", data => {
      console.log("offer made: ", data)
      pc2.setRemoteDescription(new sessionDescription(data.offer), function() {
          pc2.createAnswer(function(answer) {
              pc2.setLocalDescription(new sessionDescription(answer), function() {
                socket.emit('make-answer', {
                  answer: answer
                });
              }, error => {});
          }, error => {});
      }, error => {console.log("remote error: ", error)});
    })

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

Main = connect (
	mapStateToProps,
	mapDispatchToProps
) ( Main )

export default Main;
