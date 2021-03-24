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
  Form,
  Card,
  Message,
  TextArea
} from 'semantic-ui-react';
import { Link, withRouter } from 'react-router-dom';
import web3 from '../web3';

import linkoff from '../linkoff';

class SubmitView extends Component {

    state = { linkUrl: '', linkCaption: '', submittedLinkUrl: '', submittedLinkCaption: '' , message:''};

    constructor(props) {
        super(props);
    }


    handleSubmit = () => {
      // this.setState({ email: '', name: '' });
      const { linkUrl, linkCaption } = this.state;
      console.log("Submitted ", linkUrl, linkCaption);

      this.setState({ submittedLinkUrl: linkUrl, submittedLinkCaption: linkCaption });

      this.onSubmit();
    }

    handleChange = (e, { name, value }) => {
      this.setState({ [name]: value });
    } 

    onSubmit = async () => {
      // event.preventDefault();

      const accounts = await web3.eth.getAccounts();

      this.setState({message:"Pending"});

      await linkoff.methods.submitLink(this.state.submittedLinkUrl, this.state.submittedLinkCaption).send({
        from:accounts[0]
      });

      this.setState({message:"Done"});

    };





    render() {
        let userLayout;

        // const { name, email, submittedName, submittedEmail } = this.state;
        const { linkUrl, linkCaption } = this.state;

        userLayout = (
          <Segment
            vertical
          >
          <Grid textAlign='center' style={{ height: '100vh' }}>
            <Grid.Column style={{ maxWidth: 450 }}>
              <Card centered fluid>
                <Card.Content>
                  <Form onSubmit={this.handleSubmit}>
                  <Form.Field>
                    <label>Link Url</label>
                    <TextArea 
                      name='linkUrl' 
                      value={linkUrl} 
                      onChange={this.handleChange} 
                      placeholder='Enter the plain text url'
                    />
                  </Form.Field>
                  <Form.Field>
                    <label>Caption</label>
                    <Form.Input
                      name='linkCaption' 
                      value={linkCaption} 
                      onChange={this.handleChange} 
                      placeholder='Enter text caption' />
                  </Form.Field>
                  <Button type='submit'>Submit</Button>
                  </Form>
                </Card.Content>
              </Card>
            </Grid.Column>
          </Grid>
          </Segment>
        );


        return (
            <div>
                {userLayout}
                <p>{this.state.message}</p>
            </div>
        );
    }

}

export default withRouter(SubmitView);

