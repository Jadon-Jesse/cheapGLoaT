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
import cheapGloat from '../cheapGloat';

const ZERO_ADDR = "0x0000000000000000000000000000000000000000";

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
    if (web3 !== null && cheapGloat !== null) {
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
      const rnum = await cheapGloat.methods.currentRoundNum().call();
      // console.log(rnum);

      this.setState({
        roundNum: rnum,
        loading: true,
        accountsAvailable: accAvailable,
        accountList: accounts,
      });

      var subs = [];

      for (var i = 0; i < 20; i++) {
        const subI = await cheapGloat.methods.submissions(i).call();
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
    try {
      const result = await cheapGloat.methods.upvoteSubmissionById(sId).send({
        from: this.state.accountList[0],
        value: web3.utils.toWei("0.1", "ether")
      });
      console.log(result);
      this.setState({
        loading: false,
      });

    } catch (error) {
      console.log("Error, unable to upvote");
      this.setState({
        loading: false,
      });

    }


  }


  handleClickDownvote = (data, event) => {
    console.log("Downvote clicked");
    // console.log(data);
    const buttonClickId = event.value;
    this.submitDownvotevoteAsync(buttonClickId);

  }


  submitDownvotevoteAsync = async (sId) => {

    this.setState({
      loading: true,
    });
    try {
      const result = await cheapGloat.methods.downvoteSubmissionById(sId).send({
        from: this.state.accountList[0],
        value: web3.utils.toWei("0.1", "ether")
      });
      console.log(result);
      this.setState({
        loading: false,
      });

    } catch (error) {
      console.log("Error, unable to downvote");
      this.setState({
        loading: false,
      });

    }


  }



  render() {
    let userLayout;

    let listItems = this.state.newSubs.map((row, index) => {
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

      // check if this sub has data
      // if not, return empty component with unclickable buttons
      // console.log(row.subAddr);
      // console.log(typeof row.subAddr);

      const position = (index + 1);


      if (row.subAddr == ZERO_ADDR) {
        // use subAddr to tell if this post has been actually submitted

        const upVoteLabelObj = { basic: true, content: row.upvoteCount };
        const downVoteLabelObj = { basic: true, pointing: 'right', content: row.downvoteCount };
        return (
          <Item key={position}>

            <Item.Content style={{ maxWidth: "40px", minWidth: "40px" }} >
              <Item.Header>{position}.</Item.Header>
            </Item.Content>

            <Item.Content >

              <Item.Header >
                <div className="container" >
                  <span title="">
                  </span>
                </div>

              </Item.Header>
              <Item.Description> <Label size="mini">by {row.subAddr}</Label></Item.Description>
              <Item.Extra>


              </Item.Extra>
            </Item.Content>

            <Item.Content style={{ paddingLeft: "10px" }}>
              <div style={{ float: "right" }}>
                <Button
                  disabled
                  icon='arrow up'
                  color="blue"
                  label={upVoteLabelObj}
                  labelPosition='right'
                />
                <Button
                  disabled
                  icon='arrow down'
                  color="black"
                  label={downVoteLabelObj}
                  labelPosition='left'
                />
              </div>
            </Item.Content>

          </Item>
        );

      }
      else {

        const subUrlTruncated = truncate(row.subUrl, 42, 3);
        // console.log(row);


        // create the upvote/downvote label objects for this row
        const upVoteLabelObj = { basic: true, content: row.upvoteCount, color: "blue" };
        const downVoteLabelObj = { basic: true, pointing: 'right', content: row.downvoteCount, color: "black" };
        return (
          <Item key={index}>

            <Item.Content style={{ maxWidth: "40px", minWidth: "40px" }} >
              <Item.Header>{row.subId}.</Item.Header>
            </Item.Content>

            <Item.Content >

              <Item.Header href={row.subUrl} target='_blank'>
                <div className="container" >
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
                  color="black"
                  label={downVoteLabelObj}
                  labelPosition='left'
                  value={row.subId}
                />
              </div>
            </Item.Content>

          </Item>
        );
      }

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

