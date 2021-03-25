import React, { Component } from 'react';
// import logo from './logo.svg';
import '../App.css';
import { createMedia } from '@artsy/fresnel';
import PropTypes from 'prop-types';
import web3 from '../web3';
import linkoff from '../linkoff';
import {
  Button,
  Container,
  Icon,
  Menu,
  Segment,
  Label,
} from 'semantic-ui-react';
import { Link, withRouter } from 'react-router-dom';

class CustomLayout extends React.Component {

  constructor(props) {
    super(props);
  }

  state = {
    web3Connected: false,
  };


  componentDidMount() {
    // const { pathname } = this.props.location;
    // console.log(pathname);
    // this.setCurrentMenuItemActive();

    this.initPageData();

  }

  initPageData = async () => {

    let accounts;
    let w3Available = false;

    if (web3 !== null && linkoff !== null) {
      // console.log(web3.version);
      // console.log("Got3");
      accounts = await web3.eth.getAccounts();
      // console.log(accounts);
      if (accounts.length > 0) {
        w3Available = true;
      }
      else {
        w3Available = false;

      }

    }
    else {
      w3Available = false;

    }
    this.setState({ web3Connected: w3Available });




  };



  handleConnectWeb3Click = (event, data) => {
    console.log("web3 connect clicked");
    // console.log(event);
    // console.log(data);
    try {
      // Request account access if needed
      window.ethereum.enable();
      // Acccounts now exposed
      this.setState({ web3Connected: true });
    } catch (error) {
      // User denied account access...
      console.log("Unable to enable web3");
      this.setState({ web3Connected: false });

    }
  }




  render() {
    // const { children } = this.props
    const fixed = this.state.fixed;
    let userLayout = null;

    var authMenuItems = null;

    let userWeb3Comp = null;

    if (this.state.web3Connected === true) {
      userWeb3Comp = (
        <Label as='a'>
          <Icon name='circle' /> Connected
        </Label>
      );
    }
    else {
      userWeb3Comp = (
        <Label as='a' onClick={this.handleConnectWeb3Click}>
          <Icon name='circle outline' /> Connect
        </Label>
      );
    }

    userLayout = (
      <div>
        <Segment
          inverted
          textAlign='center'
          vertical
        >
          <Menu
            inverted
            pointing
            secondary
            stackable
          >
            <Container>
              <Menu.Item name="GloaT">
                <Button inverted >
                  <Link
                    to={{ pathname: "/cheapGLoaT/gloat" }}
                  >
                    GLoaT
                  </Link>
                </Button>
              </Menu.Item>

              <Menu.Item name="Home" link >
                <Link to={{ pathname: "/cheapGLoaT/" }} >
                  Home
                </Link>
              </Menu.Item>

              <Menu.Item name="New" link>
                <Link to={{ pathname: "/cheapGLoaT/new" }} >
                  New
                </Link>
              </Menu.Item>

              <Menu.Item name="About" link>
                <Link to={{ pathname: "/cheapGLoaT/about" }} >
                  About
                </Link>
              </Menu.Item>

              <Menu.Item position='right'>
                {userWeb3Comp}

              </Menu.Item>
            </Container>
          </Menu>
        </Segment>
        { this.props.children}
      </div>



    );


    return (
      <div>
        {userLayout}
      </div>
    );
  }

}

export default withRouter(CustomLayout);

