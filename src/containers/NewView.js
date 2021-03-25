import React, { Component } from 'react';
// import logo from './logo.svg';
import '../App.css';
// import { createMedia } from '@artsy/fresnel';
// import PropTypes from 'prop-types';
import {
  Button,
  Container,
  Header,
  Segment,
  Item,
  Label
} from 'semantic-ui-react';
import web3 from '../web3';
import { Link, withRouter } from 'react-router-dom';
import linkoff from '../linkoff';

class NewView extends Component {

  constructor(props) {
    super(props);
  }

  state = {
    curMsg: "",
    value: "",
    message: "",
    newSubs: [],
    loading: false,
    roundNum: null,
    accountsAvailable: false,
    accountList: []
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
    }
    else {
      accAvailable = false;
    }

    if (accAvailable == true) {
      // user has web3 available
      // fetch list of current submissions
      const rnum = await linkoff.methods.currentRoundNum().call();
      // console.log(rnum);

      this.setState({
        roundNum: rnum,
        loading: true,
        accountsAvailable: accAvailable,
        accountList: accounts,
      });

      var subs = [];

      for (var i = 0; i < 20; i++) {
        const subI = await linkoff.methods.submissions(i).call();
        subs.push(subI);

      }


      // console.log(message);
      this.setState({
        newSubs: subs,
        loading: false
      });


    }
    else {
      // user does not have web3
      // let them know
      this.setState({
        roundNum: null,
        loading: false,
        accountsAvailable: accAvailable,
      });
    }

  };


  handleClickUpvote = (data, event) => {
    console.log("Upvote clicked");
    // console.log(data);
    const buttonClickId = event.value;
    console.log(buttonClickId);
    // now submit the users upvote to the network
    this.submitUpvoteAsync(buttonClickId);


  }

  submitUpvoteAsync = async (sId) => {

    this.setState({
      loading: true,
    });
    const result = await linkoff.methods.upvoteSubmissionById(sId).send({
      from: this.state.accountList[0],
      value: web3.utils.toWei("0.1", "ether")
    });
    console.log(result);
    this.setState({
      loading: false,
    });

  }


  handleClickDownvote = (data, event) => {
    console.log("Downvote clicked");
    // console.log(data);
    const buttonClickId = event.value;
    console.log(buttonClickId);
  }



  render() {
    let userLayout;

    let listItems = this.state.newSubs.map(row => {
      const truncate = (str, start, end) => {
        // only if str len is > 42
        if (str.length > start) {

          let seperator = '...';
          return str.substr(0, start) + seperator + str.substr(str.length - end);
        }
        else {
          return str;
        }
      }

      const subUrlTruncated = truncate(row.subUrl, 42, 3);
      // console.log(row);

      // create the upvote/downvote label objects for this row
      const upVoteLabelObj = { basic: true, content: row.upvoteCount, color: "blue" };
      const downVoteLabelObj = { basic: true, pointing: 'right', content: row.downvoteCount, color: "red" };
      return (
        <Item>

          <Item.Content style={{ maxWidth: "40px", minWidth: "40px" }} >
            <Item.Header>{row.subId}.</Item.Header>
          </Item.Content>

          <Item.Content >

            <Item.Header href={row.subUrl}>
              <div class="container" >
                <span title={row.subUrl}>
                  {subUrlTruncated}
                </span>
              </div>

            </Item.Header>
            <Item.Description>{row.subCaption} <Label size="mini">by {row.subAddr}</Label></Item.Description>
            <Item.Extra>


            </Item.Extra>
          </Item.Content>

          <Item.Content style={{ paddingLeft: "10px" }}>
            <div style={{ float: "right" }}>
              <Button
                onClick={this.handleClickUpvote}
                icon='arrow up'
                color="blue"
                label={upVoteLabelObj}
                labelPosition='right'
                value={row.subId}
              />
              <Button
                onClick={this.handleClickDownvote}
                icon='arrow down'
                color="red"
                label={downVoteLabelObj}
                labelPosition='left'
                value={row.subId}
              />
            </div>
          </Item.Content>

        </Item>
      );

    });


    userLayout = (
      <div>
        <Segment
          inverted
          textAlign='center'
          style={{ minHeight: 100, padding: '1em 0em' }}
          vertical
          loading={this.state.loading}
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
                Round ({this.state.roundNum}) Submissions
              </Header.Content>
            </Header>

          </Container>
        </Segment>

        <Segment
          style={{ margin: '3em', padding: '1em 0em' }}
          vertical
          size="small"
        >
          <Item.Group divided>
            {listItems}
          </Item.Group>
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

export default withRouter(NewView);

