import React, { Component } from 'react';
// import logo from './logo.svg';
import '../App.css';
import { createMedia } from '@artsy/fresnel';
import PropTypes from 'prop-types';
import web3 from '../web3';
import {
  Button,
  Container,
  Header,
  Icon,
  Segment,
} from 'semantic-ui-react';
import cheapGloat from '../cheapGloat';
import { Link, withRouter } from 'react-router-dom';

class HomeView extends Component {

  constructor(props) {
    super(props);
  }

  state = {
    curMsg: "",
    value: "",
    message: "",
    accountsAvailable: false,
    accountList: [],
    cRoundStartTime: null,
    userCanCallNext: false,
    loading: false,
  };



  componentDidMount() {
    this.initPageData();

  }

  initPageData = async () => {

    let accounts = [];
    let accAvailable = false;
    let usrNxt = false;


    if (web3 !== null && cheapGloat !== null) {
      // console.log(web3.version);
      // console.log("Got3");
      accounts = await web3.eth.getAccounts();
      // console.log(accounts);
      if (accounts.length > 0) {
        accAvailable = true;

        // check if user can call next
        // const message = await cheapGloat.methods.chairperson().call();
        const roundStart = await cheapGloat.methods.roundStartTime().call();
        const roundLocked = await cheapGloat.methods.locked().call();
        var roundStartDt = new Date(roundStart * 1000);
        console.log("Round Start:", roundStart, "as dt", roundStartDt);

        const userNow = new Date(Date.now());
        console.log("User Now", userNow);
        // get diff between round start and users now in milisecs
        const dtMili = Math.abs(userNow - roundStartDt);
        console.log(dtMili);

        // const milsRoundInt = 21600000;
        const milsRoundInt = 600000;

        if (dtMili > milsRoundInt && roundLocked === false) {
          // enable pick winner for the current user
          usrNxt = true;
        }
        else {
          usrNxt = false;

        }
      }
      else {
        accAvailable = false;
        usrNxt = false;

      }
    }
    else {
      accAvailable = false;
      usrNxt = false;

    }
    this.setState({
      accountsAvailable: accAvailable,
      userCanCallNext: usrNxt,
      accountList: accounts
    });

  };

  handleClickCallNextRound = () => {
    console.log("User called next");
    // now try call next round async
    this.callNextRoundPickWinner();

  }

  callNextRoundPickWinner = async () => {
    this.setState({ loading: true });
    try {
      const result = await cheapGloat.methods.checkIfNextRoundAndPickWinner().send({
        from: this.state.accountList[0],
        gas: "5000000",
      });
    } catch (error) {
      console.log("Error, unable to pick winner. Err:", error);
    }
    this.setState({ loading: false });
  }





  render() {
    let userLayout;
    let submitButton = null;
    let callNextButton = null;

    if (this.state.accountsAvailable === true) {
      submitButton = (
        <Link to={{ pathname: "/cheapGLoaT/submit" }}>
          <Button primary size='huge' icon labelPosition='right'>
            Submit
            <Icon name='right arrow' />
          </Button>
        </Link>
      );
    }
    else {
      submitButton = (
        <div>
          <Button primary size='huge' disabled icon labelPosition='right'>
            Submit
              <Icon name='right arrow' />
          </Button>
          <p>(Unable to connect to web3 directly - Refresh the page OR try installing metamask to participate)</p>
        </div>
      );
    }

    if (this.state.userCanCallNext === true) {
      callNextButton = (
        <Button loading={this.state.loading} basic color='orange' size='huge' onClick={this.handleClickCallNextRound} icon labelPosition='right'>
          Next Round
          <Icon name='recycle' />
        </Button>
      );
    }

    userLayout = (
      <Segment
        inverted
        textAlign='center'
        style={{ padding: '1em 0em', height: '100vh' }}
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
          <div>
            <div style={{ marginBottom: '1em' }}>
              {submitButton}
            </div>

            <div style={{ marginBottom: '1em' }}>
              {callNextButton}
            </div>
          </div>
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

