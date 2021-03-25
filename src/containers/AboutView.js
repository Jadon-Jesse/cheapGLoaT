import React, { Component } from 'react';
// import logo from './logo.svg';
// import './App.css';
import { createMedia } from '@artsy/fresnel';
import PropTypes from 'prop-types';
// import web3 from './web3';
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
import { Link, withRouter } from 'react-router-dom';

class AboutView extends Component {

  constructor(props) {
    super(props);
  }







  render() {
    let userLayout;
    userLayout = (
      <Segment
        inverted
        textAlign='center'
        style={{ minHeight: 100, padding: '1em 0em' }}
        vertical
      >
        <Container text>
          <Header
            as='h1'
            inverted
            style={{
              fontWeight: 'normal',
              marginBottom: '1em',
              marginTop: '1em',
            }}
          >
            <Header.Content>
              About cheapGLoaT
            </Header.Content>
          </Header>
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

export default withRouter(AboutView);

