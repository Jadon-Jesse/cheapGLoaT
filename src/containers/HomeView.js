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
        curMsg:"",
        value:"",
        message:"",
    };
    


    componentDidMount() {
      this.initSourceFeedViewData();

    }

    initSourceFeedViewData = async () => {

      let accounts;
      if (web3 !== null && linkoff !== null) {
        console.log(web3.version);
        console.log("Got3");
        accounts = await web3.eth.getAccounts();
        console.log(accounts);

        const message = await linkoff.methods.chairperson().call();
        this.setState({
          curMsg:message
        });
      }
      else{
        console.log("No 3");
      }



    };





    render() {
        let userLayout;
        userLayout = (
          <Segment
            inverted
            textAlign='center'
            style={{ minHeight: 700, padding: '1em 0em' }}
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
            <Link to={{ pathname: "/submit" }}>
            <Button primary size='huge'>
              Submit
              <Icon name='right arrow' />
            </Button>
            </Link>
            <Header
              as='h2'
              inverted
              style={{
                fontSize: '1.7em',
                fontWeight: 'normal',
                marginTop:'1.5em',
              }}
            >
              <p>Or browse <Link to={{ pathname: "/new" }}>new submissions</Link></p>  

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

