import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
// import { createMedia } from '@artsy/fresnel';
// import PropTypes from 'prop-types';
// import web3 from './web3';
import CustomLayout from './containers/Layout';
import { BrowserRouter as Router } from 'react-router-dom';
import BaseRouter from './routes';

class App extends Component {





  render() {

    return (
      <div>
        <Router>
          <CustomLayout {...this.props}>
            <BaseRouter />
          </CustomLayout>
        </Router>
      </div>
    );
  }

}

export default App;