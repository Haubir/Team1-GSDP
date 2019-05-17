import React, { Component } from 'react';
import { connect } from 'react-redux'

class Home extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="w3-content">
        <h1>How does it work ?</h1>
        <h5 className="w3-padding-32">The graphical user interface used for the client to communicate with the robot from a distance is pretty straightforward. Nontheless, here are some instructions in order to make sure that your experience as a user is as smooth as possible.</h5>

        <p className="w3-text-grey"><b>The up arrow </b> (<span className="glyphicon glyphicon-arrow-up"></span>) signals the robot to move forward.</p>
        <p className="w3-text-grey"><b>The right arrow </b> (<span className="glyphicon glyphicon-share-alt"></span>) signals the robot to turn right.</p>
        <p className="w3-text-grey"><b>The left arrow </b> (<span className="glyphicon glyphicon-share-alt icon-flipped"></span>) signals the robot to turn left.</p>
        <p className="w3-text-grey"><b>The stop button </b> (<span className="glyphicon glyphicon-stop"></span>) signals the robot to stop.</p>
        <p className="w3-text-grey"><b>The upload button </b> (<span className="glyphicon glyphicon-upload"></span>) signals the robot to raise its fork.</p>
        <p className="w3-text-grey"><b>The download button </b> (<span className="glyphicon glyphicon-download"></span>) signals the robot to lower its fork.</p>
        <p className="w3-text-grey"><b>The A button </b> (<span className="glyphicon glyphicon-font"></span>) signals the robot to resume automated control.</p>
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

Home = connect (
	mapStateToProps,
	mapDispatchToProps
) ( Home )

export default Home;
