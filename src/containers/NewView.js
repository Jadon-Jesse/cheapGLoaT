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
        curMsg:"",
        value:"",
        message:"",
        newSubs:[],
    };

    componentDidMount() {
      this.initSourceFeedViewData();

    }

    initSourceFeedViewData = async () => {
      let accounts;

      accounts = await web3.eth.getAccounts();
      console.log(accounts);

      var subs = [];

      for (var i = 0; i < 3; i++) {
        const subI = await linkoff.methods.submissions(i).call();
        // var obj = {
        //   subKey:i,
        //   subData:subI
        // };
        subs.push(subI);
        
      }

      
      // console.log(message);
      this.setState({
        newSubs:subs
      });

    };







    render() {
        let userLayout;

        let listItems = this.state.newSubs.map( row => {
          console.log(row);
          return (
              <Item>

                <Item.Content verticalAlign="middle" style={{maxWidth:"50px"}}>
                  <Item.Header>{row.subId}.</Item.Header>
                </Item.Content>
                <Item.Content>
                  
                  <Item.Header href={row.subUrl}>
                    <div class="container" style={{maxWidth: "800px"}}>
                      <span title={row.subUrl} style={{
                        width: "100%",
                        display: "inline-block",
                        direction: "ltr",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        overflow: "hidden"
                      }}>
                        {row.subUrl}
                      </span>
                    </div>
                    
                  </Item.Header>
                  <Item.Description>{row.subCaption}</Item.Description>
                  <Item.Extra>

                    <Label>by {row.subAddr}</Label>
                  </Item.Extra>
                </Item.Content>

                <Item.Content>
                  <div style={{float:"right"}}>
                  <Button
                    content='Like'
                    icon='heart'
                    label={{ basic: true, content: '2,048' }}
                    labelPosition='right'
                  />
                  <Button
                    content='Like'
                    icon='heart'
                    label={{ basic: true, pointing: 'right', content: '2,048' }}
                    labelPosition='left'
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
          >
          <Container text>
            <Header
              as='h1'
              content='New Submissions'
              inverted
              style={{
                fontSize: '4em',
                fontWeight: 'normal',
                marginBottom: 0,
                marginTop: '3em',
              }}
            />
          </Container>
          </Segment>

          <Segment 
            style={{margin: '3em', padding: '1em 0em' }}
            vertical
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

