import React, { Component } from 'react';
import { connect } from 'react-redux'
// import io from 'socket.io-client'

class MainCamera extends Component {

  constructor(props) {
    super(props);

    this.state = {
      ws: {}
    }
  }

  componentDidMount() {
    const video = document.querySelector('#video');

    // request access to webcam
    navigator.mediaDevices.getUserMedia({video: {width: 426, height: 240}}).then((stream) => video.srcObject = stream);

    // returns a frame encoded in base64
    const getFrame = () => {
        const canvas = document.createElement('canvas');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        canvas.getContext('2d').drawImage(video, 0, 0);
        const data = canvas.toDataURL('image/png');
        return data;
    }
    const WS_URL = window.location.origin.replace(/^http/, 'ws');
    console.log(WS_URL)
    const FPS = 10;
    const ws = new WebSocket(WS_URL);
    this.setState({ws})
    ws.onopen = () => {
        console.log(`Connected to ${WS_URL}`);
        setInterval(() => {
            // console.log("sending: ")
            ws.send(getFrame());
        }, 1000 / FPS);
    }
  }

  componentWillUnmount() {
    this.state.ws.close()
  }

  render() {
    const {message, test, command} = this.props;
    return (
      <div className="MainCamera">
        <div className="container">
          <div className="content">
            <div id="videoContainer" >
              <video id="video" width="100%" height="100%" autoPlay></video>
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
  }
}

const mapDispatchToProps = {
}

MainCamera = connect (
	mapStateToProps,
	mapDispatchToProps
) ( MainCamera )

export default MainCamera;
