import React, { Component } from 'react';
import {
  Button,
  Grid,
  Segment,
  Form,
  Card,
  TextArea
} from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import web3 from '../web3';

import cheapGloat from '../cheapGloat';

class SubmitView extends Component {

  state = {
    linkUrl: '',
    linkCaption: '',
    submittedLinkUrl: '',
    submittedLinkCaption: '',
    message: '',
    loading: false,
    linkUrlErr: false,
    linkCapErr: false
  };

  constructor(props) {
    super(props);
  }


  handleSubmit = () => {
    // this.setState({ email: '', name: '' });
    try {
      // first check if the submitted vals are valid
      var valStrUrl = String(this.state.linkUrl);
      var valStrCap = String(this.state.linkCaption);
      if (this.is_url(valStrUrl) === true && this.is_validCap(valStrCap) === true) {
        this.setState({
          submittedLinkUrl: valStrUrl,
          submittedLinkCaption: valStrCap,
          linkUrlErr: false,
          linkCapErr: false
        });
        // now call the submitLink function
        this.onSubmit();

      }
      else {
        // not valid submission - disp error
        this.setState({
          linkUrlErr: true,
          linkCapErr: true
        });
      }
    } catch (error) {
      this.setState({
        linkUrlErr: true,
        linkCapErr: true
      });

    }

  }

  handleChange = (e, { name, value }) => {
    // this.setState({ [name]: value });
    try {
      var valStr = String(value);
      if (this.is_validCap(valStr) === true) {
        this.setState({
          linkCaption: valStr,
          linkCapErr: false
        });

      }
      else {
        // not valid caption
        this.setState({
          linkCaption: valStr,
          linkCapErr: true
        });
      }
    } catch (error) {
      this.setState({
        linkCaption: value,
        linkCapErr: true
      });

    }
  }

  is_url = (str) => {
    // taken from: https://www.w3resource.com/javascript-exercises/javascript-regexp-exercise-9.php
    let regexp = /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
    if (regexp.test(str)) {
      return true;
    }
    else {
      return false;
    }

  }

  is_validCap = (str) => {
    // taken from: https://www.w3resource.com/javascript-exercises/javascript-regexp-exercise-9.php
    let startReg = /^\s/;
    let endReg = /\s$/;
    if (startReg.test(str) === true || endReg.test(str) === true || str.length === 0 || str.length > 64) {
      return false;
    }
    else {
      return true;
    }

  }

  handleChangeUrl = (e, { name, value }) => {
    try {
      var valStr = String(value);
      if (this.is_url(valStr) === true) {
        this.setState({
          linkUrl: valStr,
          linkUrlErr: false
        });

      }
      else {
        // not valid url
        this.setState({
          linkUrl: valStr,
          linkUrlErr: true
        });
      }
    } catch (error) {
      this.setState({
        linkUrl: value,
        linkUrlErr: true
      });

    }

  }

  onSubmit = async () => {
    // event.preventDefault();

    try {
      const accounts = await web3.eth.getAccounts();

      this.setState({ message: "Pending", loading: true });

      await cheapGloat.methods.submitLink(this.state.submittedLinkUrl, this.state.submittedLinkCaption).send({
        from: accounts[0]
      });

      this.setState({ message: "Done", loading: false });

    }
    catch (error) {
      console.log("Error submitting. Err:", error);
      this.setState({ message: "Error", loading: false });

    }



  };





  render() {
    let userLayout;

    // const { name, email, submittedName, submittedEmail } = this.state;
    // const { linkUrl, linkCaption } = this.state;
    // if 

    userLayout = (
      <Segment
        vertical
      >
        <Grid textAlign='center' style={{ height: '100vh' }}>
          <Grid.Column style={{ maxWidth: 450 }}>
            <Card centered fluid>
              <Card.Content>
                <Form loading={this.state.loading} onSubmit={this.handleSubmit}>
                  <Form.Field error={this.state.linkUrlErr}>
                    <label>Link Url</label>
                    <TextArea
                      name='linkUrl'
                      value={this.state.linkUrl}
                      onChange={this.handleChangeUrl}
                      placeholder='Enter the plain text url'
                    />
                  </Form.Field>
                  <Form.Field error={this.state.linkCapErr}>
                    <label>Caption</label>
                    <Form.Input
                      name='linkCaption'
                      value={this.state.linkCaption}
                      onChange={this.handleChange}
                      placeholder='Enter text caption (Max 64 characters)' />
                  </Form.Field>
                  <Button type='submit'>Submit</Button>
                </Form>
                <p>{this.state.message}</p>
              </Card.Content>
            </Card>
          </Grid.Column>
        </Grid>
      </Segment>
    );


    return (
      <div>
        {userLayout}

      </div>
    );
  }

}

export default withRouter(SubmitView);

