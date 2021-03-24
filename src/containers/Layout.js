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
  Divider,
  Grid,
  Header,
  Icon,
  Image,
  List,
  Menu,
  Segment,
  Label,
} from 'semantic-ui-react';
import { Link, withRouter } from 'react-router-dom';

const { MediaContextProvider, Media } = createMedia({
  breakpoints: {
    mobile: 0,
    tablet: 768,
    computer: 1024,
  },
})


class CustomLayout extends React.Component {

  constructor(props) {
    super(props);
  }

  state = {
    gloatActive: false,
    homeActive: true,
    newActive: false,
    aboutActive: false,
    web3Connected: false,
  };

  componentDidMount() {
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


  hideFixedMenu = () => this.setState({ fixed: false })
  showFixedMenu = () => this.setState({ fixed: true })


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

  handleMenuItemClick = (event, data) => {
    // console.log(event);
    // console.log(data);

    // var pageName = data.children.props.children.props.children;
    var pageName = event.target.innerText;
    console.log(pageName);
    if (pageName == "GLoaT") {
      this.setState({
        gloatActive: true,
        homeActive: false,
        newActive: false,
        aboutActive: false
      });
    }
    else if (pageName == "Home") {
      this.setState({
        gloatActive: false,
        homeActive: true,
        newActive: false,
        aboutActive: false
      });

    }
    else if (pageName == "New") {
      this.setState({
        gloatActive: false,
        homeActive: false,
        newActive: true,
        aboutActive: false
      });

    }

    else if (pageName == "About") {
      this.setState({
        gloatActive: false,
        homeActive: false,
        newActive: false,
        aboutActive: true
      });

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
              <Menu.Item active={this.state.gloatActive} name="GloaT">
                <Button inverted >
                  <Link
                    to={{ pathname: "/cheapGLoaT/gloat" }}
                    onClick={this.handleMenuItemClick}>
                    GLoaT
                  </Link>
                </Button>
              </Menu.Item>

              <Menu.Item active={this.state.homeActive} name="Home" link >
                <Link to={{ pathname: "/cheapGLoaT/" }} onClick={this.handleMenuItemClick}>
                  Home
                </Link>
              </Menu.Item>

              <Menu.Item active={this.state.newActive} name="New" link>
                <Link to={{ pathname: "/cheapGLoaT/new" }} onClick={this.handleMenuItemClick}>
                  New
                </Link>
              </Menu.Item>

              <Menu.Item active={this.state.aboutActive} name="About" link>
                <Link to={{ pathname: "/cheapGLoaT/about" }} onClick={this.handleMenuItemClick}>
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

