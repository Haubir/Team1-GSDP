import React, { Component } from 'react';
import { connect } from 'react-redux'

import { appActions } from './core/app'

// import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
  }
  

  componentDidMount() {
  }

  render() {
    return (
      <div className="App">
        {this.props.children}
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
