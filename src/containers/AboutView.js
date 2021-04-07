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
  Message,
  Visibility,
  Item
} from 'semantic-ui-react';
import { Link, withRouter } from 'react-router-dom';

class AboutView extends Component {

  constructor(props) {
    super(props);
  }







  render() {
    let userLayout;
    const upVoteLabelObj = { basic: true, content: 1 };
    const downVoteLabelObj = { basic: true, pointing: 'right', content: 1 };
    userLayout = (
      <div>
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
        <Segment textAlign='justified'>
          <Container text>
            <b>cheapGLoaT</b>
            <Divider />
            "Greatest Links of all Time" is a decentralized link aggrigation system built on the cheapEthereum network
          </Container>


        </Segment>
        <Segment textAlign='justified'>
          <Container text>
            <b>How it works</b>
            <Divider />
            <List as="ul">
              <List.Item as="li">
                Each <b>round</b> there are 69 submission spots available
                <Message size='mini'>
                  A<b> round  </b> lasts approximately <b>24 hours</b> and is essentially the heartbeat of the cheapGLoaT system
                </Message>
              </List.Item>
              <List.Item as="li">
                Each round a <b>unique user </b>is allowed to submit a <b>unique link </b>(if there are submission spots available)
                <Message size='mini'>
                  A<b> unique user </b>is a user who has not yet made a submission in the current round
                  <br />
                  <br />
                  A<b> unique link </b>is a link which has not yet been submistted in the current round and also has
                    not already been entered into the Greatest Links of all Time

                </Message>
              </List.Item>
              <List.Item as="li">
                Each round<b> general users </b>are allowed to view and interact with the current round submissions
                by visiting the "New" tab
                <Message size='mini'>
                  <b> general users </b>are the set of users who have sucessfully connected to the cheapGLoaT frontend via metamask

                </Message>
              </List.Item>
              <List.Item as="li">
                Each round a general user is allowed to <b>upvote </b>multiple submissions but is not allowed to <b>upvote </b>the same submission more than once
                <Message size="mini">
                  <Button
                    icon='arrow up'
                    color="blue"
                    label={upVoteLabelObj}
                    labelPosition='right'
                  />
                  1 <b>upvote </b>costs a minimum of 0.5 ceth

                </Message>


              </List.Item>
              <List.Item as="li">
                Each round a general user is allowed to <b>downvote </b>multiple submissions but is not allowed to <b>downvote </b>the same submission more than once
                <Message size="mini">

                  <Button
                    icon='arrow down'
                    color="black"
                    label={downVoteLabelObj}
                    labelPosition='left'
                  />
                  1 <b>downvote </b>costs a minimum of 0.5 ceth
                </Message>

              </List.Item>
              <List.Item as="li">
                Each round a<b> prize pool </b>is formed so that the winnings can be distributed appropriately
                <Message size='mini'>
                  The<b> prize pool </b>is the value of the of the total number of upvotes, accross all submissions, for that round (downvotes are not included)
                  <br />
                  <br />
                  For example, if there were 3 submissions in the current round; Submission A with 3 upvotes, Submission B with 2 upvotes and Submission C with 1 upvote and 5 downvotes.
                  Then, that round's <b>prize pool</b> will be = (0.5 ceth * (3+2+1)) = 3 ceth
                  <br />
                  <br />
                  The<b> prize pool </b>for a round is distributed as follows; 70% goes to the winner, 20% to the lucky caller, 10% to the manager
                </Message>
              </List.Item>
              <List.Item as="li">
                The<b> winner </b>of each round will be the submission with the highest <b>score</b> (or earliest submission)
                <Message size='mini'>
                  The<b> winner </b>will recieve 70% of the total prize pool for that that round
                  <br />
                  <br />
                  The<b> winner's </b>submission will be entered into the Greatest Links of all Time
                  <br />
                  <br />
                  The<b> score </b>for a submission is calculated by taking the difference between it's number of upvotes and it's number of downvotes
                </Message>
              </List.Item>
              <List.Item as="li">
                At the end of each round one lucky general user will be allowed to call the <b>checkIfNextRoundAndPickWinner</b> function
                <Message size='mini'>
                  <b>checkIfNextRoundAndPickWinner </b>is a function defined in the cheapGLoaT contract
                  <br />
                  <br />
                  The user who chooses to execute the<b> checkIfNextRoundAndPickWinner </b>function will be the one who is responsible for
                  picking the winner, settling payments and resetting the cheapGLoaT contract for the next round
                  <br />
                  <br />
                  Since the <b>checkIfNextRoundAndPickWinner </b>function carries out most of the contract logic, the gas price to execute can get a bit high (min 5000000 wei)
                  <br />
                  <br />
                  So if a user sucessfully executes the <b>checkIfNextRoundAndPickWinner </b>function, they will recieve 20% of the total prize pool for that round

                </Message>

              </List.Item>








            </List>


          </Container>


        </Segment>

        <Segment textAlign='justified'>
          <Container text>
            <b>Useful Links</b>
            <Divider />
            <List as="ul">
              <List.Item as="li">
                <Item.Header href="https://cheapeth.org/" target='_blank'>cheapEthereum
                </Item.Header>
              </List.Item>
              <List.Item as="li">
                <Item.Header href="https://github.com/Jadon-Jesse/cheapGLoaT-contracts" target='_blank'>cheapGLoaT contract source code
                </Item.Header>
              </List.Item>
              <List.Item as="li">
                <Item.Header href="https://github.com/Jadon-Jesse/cheapGLoaT" target='_blank'>cheapGLoaT react frontend source code
                </Item.Header>
              </List.Item>
            </List>
          </Container>


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

export default withRouter(AboutView);

