import React, { Component } from 'react';
import '../App.css';
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
    accountList: [],
    upvoteIsLoading: [],
    downvoteIsLoading: [],
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

    if (accAvailable === true) {
      // user has web3 available
      // fetch list of current submissions
      const rnum = await cheapGloat.methods.currentRoundNum().call();
      // get current round sub count
      const subLen = await cheapGloat.methods.subCount().call();

      // console.log(rnum);

      this.setState({
        roundNum: rnum,
        loading: true,
        accountsAvailable: accAvailable,
        accountList: accounts,
      });

      var subs = [];
      var loadingUs = [];
      var loadingDs = [];

      for (var i = 0; i < 69; i++) {
        // only fetch submissions currently in session
        if (i < subLen) {
          const subI = await cheapGloat.methods.submissions(i).call();
          console.log(subI);
          console.log(typeof subI);

          subs.push(subI);
          loadingUs.push(false);
          loadingDs.push(false);

        }
        else {
          // push dummy data

          const dummySub = {
            downvoteCount: "0",
            subAddr: ZERO_ADDR,
            subCaption: "",
            subUrl: "",
            upvoteCount: "0",
          };
          subs.push(dummySub);
          loadingUs.push(false);
          loadingDs.push(false);

        }


      }


      // console.log(message);
      this.setState({
        newSubs: subs,
        loading: false,
        upvoteIsLoading: loadingUs,
        downvoteIsLoading: loadingDs
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


  updateSubVotesAtId = async (sId) => {
    this.setState({
      loading: true,
    });
    try {
      // get the updated upvote/downvote count
      const subI = await cheapGloat.methods.submissions(sId).call();
      // now update the state newSub array at the position
      var subList = this.state.newSubs;
      subList[sId] = subI;
      // subs.push(subI);
      // console.log(result);
      this.setState({
        newSubs: subList,
        loading: false,
      });

    } catch (error) {
      console.log("Error, unable to update submission vote count. Err:", error);
      this.setState({
        loading: false,
      });

    }

  }


  handleClickUpvote = (data, event) => {
    // console.log("Upvote clicked");
    // console.log(data);
    const buttonClickId = event.value;
    // console.log(buttonClickId);
    console.log("Upvote clicked on subID:", buttonClickId);
    // now submit the users upvote to the network
    this.submitUpvoteAsync(buttonClickId);




  }



  submitUpvoteAsync = async (sId) => {
    // update the state of the clicked button
    var upvotesLoading = this.state.upvoteIsLoading;
    // change state of the button to loading
    upvotesLoading[sId] = true;

    this.setState({
      loading: true,
      upvoteIsLoading: upvotesLoading
    });
    try {
      const result = await cheapGloat.methods.upvoteSubmissionById(sId).send({
        from: this.state.accountList[0],
        value: web3.utils.toWei("0.005", "ether"),
        gas: "1000000"
      });
      // console.log(result);

      // Finally update this items vote count only
      await this.updateSubVotesAtId(sId);
      upvotesLoading[sId] = false;



      this.setState({
        loading: false,
        upvoteIsLoading: upvotesLoading
      });

    } catch (error) {
      console.log("Error, unable to upvote. Err:", error);
      upvotesLoading[sId] = false;
      this.setState({
        loading: false,
        upvoteIsLoading: upvotesLoading
      });

    }


  }


  handleClickDownvote = (data, event) => {
    // console.log(data);
    const buttonClickId = event.value;
    console.log("Downvote clicked on subID:", buttonClickId);
    this.submitDownvotevoteAsync(buttonClickId);
    // Finally update this items vote count only
    // this.updateSubVotesAtId(buttonClickId);


  }


  submitDownvotevoteAsync = async (sId) => {
    // update the state of the clicked button
    var downvotesLoading = this.state.downvoteIsLoading;
    // change state of the button to loading
    downvotesLoading[sId] = true;

    this.setState({
      loading: true,
      downvoteIsLoading: downvotesLoading
    });

    try {
      const result = await cheapGloat.methods.downvoteSubmissionById(sId).send({
        from: this.state.accountList[0],
        value: web3.utils.toWei("0.005", "ether"),
        gas: "1000000"
      });
      // console.log(result);

      // Finally update this items vote count only
      await this.updateSubVotesAtId(sId);
      downvotesLoading[sId] = false;


      this.setState({
        loading: false,
        downvoteIsLoading: downvotesLoading
      });

    } catch (error) {
      console.log("Error, unable to downvote. Err:", error);
      downvotesLoading[sId] = false;
      this.setState({
        loading: false,
        downvoteIsLoading: downvotesLoading
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



      if (row.subAddr == ZERO_ADDR) {
        // use subAddr to tell if this post has been actually submitted

        const upVoteLabelObj = { basic: true, content: row.upvoteCount };
        const downVoteLabelObj = { basic: true, pointing: 'right', content: row.downvoteCount };
        return (
          <Item key={index}>

            <Item.Content style={{ maxWidth: "40px", minWidth: "40px" }} >
              <Item.Header>{index}.</Item.Header>
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
              <Item.Header>{index}.</Item.Header>
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
                  loading={this.state.upvoteIsLoading[index]}
                  onClick={this.handleClickUpvote}
                  icon='arrow up'
                  color="blue"
                  label={upVoteLabelObj}
                  labelPosition='right'
                  value={row.subId}
                />
                <Button
                  loading={this.state.downvoteIsLoading[index]}
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

