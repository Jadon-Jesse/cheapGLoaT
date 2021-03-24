import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { createMedia } from '@artsy/fresnel';
import PropTypes from 'prop-types';
import web3 from './web3';
import {
  Button,
  Container,
  Divider,
  Grid,
  Header,
  Icon,
  Image,
  List,
  Menu,
  Segment,
  Sidebar,
  Visibility,
} from 'semantic-ui-react';
import CustomLayout from './containers/Layout';
import { BrowserRouter as Router } from 'react-router-dom';
import BaseRouter from './routes';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      curMsg:"",
      value:"",
      message:"",
    };
  }

  componentDidMount() {
    this.initSourceFeedViewData();

  }

  initSourceFeedViewData = async () => {
    let accounts;
    if (web3 !== null) {
      console.log(web3.version);
      console.log("Got3");
      accounts = await web3.eth.getAccounts();
      console.log(accounts);
    }
    else{
      console.log("No 3");
    }

  };




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