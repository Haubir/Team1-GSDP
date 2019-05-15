import React, { Component } from 'react';
import { connect } from 'react-redux'
import io from 'socket.io-client'

class Camera extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
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

    const pc = new peerConnection({"iceServers":[{"url": "stun:stun.l.google.com:19302"}]})
    
    

    if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true}).then( (stream) => {
        if(stream) {
          pc.addStream(stream)
          createOffer()
          const video = document.getElementById('video');
          video.srcObject = stream;
        }
      }, error => { console.log("error stream", error)})
    }

    socket.on('answer-made', function(data) {
      console.log("answer")
      pc.setRemoteDescription(new sessionDescription(data.answer), function() {
          console.log("answered")
      }, error => {});
    });

    socket.on("offer-made", data => {
        console.log("offer made: ", data)
      })

    function createOffer() {
      pc.createOffer(function(offer) {
          pc.setLocalDescription(new sessionDescription(offer), function() {
              socket.emit('make-offer', {
                  offer: offer
              });
          }, error => {});
      }, error => {});
    }
  }

  render() {
    const {message, test, command} = this.props;
    return (
      <div className="Camera">
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

Camera = connect (
	mapStateToProps,
	mapDispatchToProps
) ( Camera )

export default Camera;
