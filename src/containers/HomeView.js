import React, { Component } from 'react';
// import logo from './logo.svg';
import '../App.css';
import { createMedia } from '@artsy/fresnel';
import PropTypes from 'prop-types';
import web3 from '../web3';
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
import linkoff from '../linkoff';
import { Link, withRouter } from 'react-router-dom';

class HomeView extends Component {

  constructor(props) {
    super(props);
  }

  state = {
    curMsg: "",
    value: "",
    message: "",
    accountsAvailable: false
  };



  componentDidMount() {
    this.initPageData();

  }

  initPageData = async () => {

    let accounts;
    let accAvailable = false;
    if (web3 !== null && linkoff !== null) {
      // console.log(web3.version);
      // console.log("Got3");
      accounts = await web3.eth.getAccounts();
      // console.log(accounts);
      if (accounts.length > 0) {
        accAvailable = true;
      }
      else {
        accAvailable = false;

      }

      const message = await linkoff.methods.chairperson().call();
      this.setState({
        curMsg: message
      });
    }
    else {
      accAvailable = false;

    }
    this.setState({ accountsAvailable: accAvailable });




  };





  render() {
    let userLayout;
    let submitButton = null;

    if (this.state.accountsAvailable === true) {
      submitButton = (
        <Link to={{ pathname: "/cheapGLoaT/submit" }}>
          <Button primary size='huge'>
            Submit
            <Icon name='right arrow' />
          </Button>
        </Link>
      );
    }
    else {
      submitButton = (
        <div>
          <Link>
            <Button primary size='huge' disabled>
              Submit
              <Icon name='right arrow' />
            </Button>
          </Link>
          <p>(Unable to connect to web3 directly - try installing metamask to participate)</p>
        </div>
      );
    }

    userLayout = (
      <Segment
        inverted
        textAlign='center'
        style={{ padding: '1em 0em', height: '100%' }}
        vertical
      >
        <Container text>
          <div className="logoText">
            <p>cheap</p>GLOAT

              </div>
          <Header
            as='h1'
            content='Submit your greatest link'
            inverted
            style={{
              fontSize: '4em',
              fontWeight: 'normal',
              marginBottom: '1em',
              marginTop: '1em',
            }}
          />
          {submitButton}
          <Header
            as='h2'
            inverted
            style={{
              fontSize: '1.7em',
              fontWeight: 'normal',
              marginTop: '1.5em',
            }}
          >
            <p>Or browse <Link to={{ pathname: "/cheapGLoaT/new" }}>new submissions</Link></p>

          </Header>


          {this.state.curMsg}


        </Container>
      </Segment>
    );


    return (
      <div>

        {userLayout}
      </div>
    );
  }

}

export default withRouter(HomeView);

