import React, { Component } from 'react';
// import logo from './logo.svg';
import '../App.css';
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
  Card
} from 'semantic-ui-react';
import { Link, withRouter } from 'react-router-dom';

class GloatView extends Component {

  constructor(props) {
    super(props);
  }





  render() {
    let userLayout;
    userLayout = (
      <div  >
        <Segment
          inverted
          textAlign='center'
          style={{ minHeight: 100, padding: '1em 0em' }}
          vertical
        >
          <Container text >
            <Header

              as='h1'

              inverted
              style={{
                fontWeight: 'normal',
                marginBottom: '1em',
                marginTop: '1em',
              }}
            >
              Greatest Links of all Time
            </Header>
          </Container>

        </Segment>

        <Segment
          textAlign='center'
          style={{ margin: '3em', padding: '1em 0em' }}
          vertical>
          <List divided relaxed>
            <List.Item>
              <List.Icon name='github' size='large' verticalAlign='middle' />
              <List.Content>
                <List.Header as='a'>Semantic-Org/Semantic-UI</List.Header>
                <List.Description as='a'>Updated 10 mins ago</List.Description>
              </List.Content>
            </List.Item>
            <List.Item>
              <List.Icon name='github' size='large' verticalAlign='middle' />
              <List.Content>
                <List.Header as='a'>Semantic-Org/Semantic-UI-Docs</List.Header>
                <List.Description as='a'>Updated 22 mins ago</List.Description>
              </List.Content>
            </List.Item>
            <List.Item>
              <List.Icon name='github' size='large' verticalAlign='middle' />
              <List.Content>
                <List.Header as='a'>Semantic-Org/Semantic-UI-Meteor</List.Header>
                <List.Description as='a'>Updated 34 mins ago</List.Description>
              </List.Content>
            </List.Item>
          </List>
        </Segment>
      </div>
    );


    return (
      <div>
        {userLayout}
      </div>
    );
  }

}

export default withRouter(GloatView);

