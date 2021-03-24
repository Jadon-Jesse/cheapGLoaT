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
} from 'semantic-ui-react';
import { Link, withRouter } from 'react-router-dom';

const { MediaContextProvider, Media } = createMedia({
  breakpoints: {
    mobile: 0,
    tablet: 768,
    computer: 1024,
  },
})


class CustomLayout extends React.Component {

    constructor(props) {
        super(props);
    }

    state = {
      gloatActive:false,
      homeActive:true,
      newActive:false,
      aboutActive:false
    };

    hideFixedMenu = () => this.setState({ fixed: false })
    showFixedMenu = () => this.setState({ fixed: true })

    handleMenuItemClick = (event, data) => {
      // console.log(event);
      // console.log(data);

      // var pageName = data.children.props.children.props.children;
      var pageName = event.target.innerText;
      console.log(pageName);
      if (pageName == "GLoaT") {
        this.setState({
          gloatActive:true,
          homeActive:false,
          newActive:false,
          aboutActive:false
        });
      }
      else if (pageName == "Home") {
        this.setState({
          gloatActive:false,
          homeActive:true,
          newActive:false,
          aboutActive:false
        });

      }
      else if (pageName == "New") {
        this.setState({
          gloatActive:false,
          homeActive:false,
          newActive:true,
          aboutActive:false
        });

      }

      else if (pageName == "About") {
        this.setState({
          gloatActive:false,
          homeActive:false,
          newActive:false,
          aboutActive:true
        });

      }

    }


    render() {
        // const { children } = this.props
        const { fixed } = this.state;
        let userLayout = null;

        var authMenuItems = null;

        userLayout = (
          <Visibility
            once={false}
            onBottomPassed={this.showFixedMenu}
            onBottomPassedReverse={this.hideFixedMenu}
          >
            <Segment
              inverted
              textAlign='center'
              vertical
            >
              <Menu
                fixed={fixed ? 'top' : null}
                inverted={!fixed}
                pointing={!fixed}
                secondary={!fixed}
                size='large'
              >
                <Container>
                  <Menu.Item active={this.state.gloatActive} name="GloaT">
                    <Button inverted={!fixed}  >
                      <Link to={{ pathname: "/gloat" }} onClick={this.handleMenuItemClick}>
                      GLoaT
                      </Link>
                    </Button>
                  </Menu.Item>
                  
                  <Menu.Item active={this.state.homeActive} name="Home"  link >
                    <Link to={{ pathname: "/" }} onClick={this.handleMenuItemClick}>
                      Home
                    </Link>
                  </Menu.Item>

                  <Menu.Item active={this.state.newActive} name="New"  link>
                    <Link to={{ pathname: "/new" }} onClick={this.handleMenuItemClick}>
                      New
                    </Link>
                  </Menu.Item>
                  
                  <Menu.Item  active={this.state.aboutActive} name="About"  link>
                    <Link to={{ pathname: "/about" }} onClick={this.handleMenuItemClick}>
                      About
                    </Link>
                  </Menu.Item>

                  <Menu.Item position='right'>
                    <Button circular as='a' inverted={!fixed}>
                      Connect
                    </Button>
                  </Menu.Item>
                </Container>
              </Menu>
            </Segment>
            {this.props.children}
          </Visibility>

        );


        return (
          <div>
            {userLayout}

          
          </div>
        );
    }

}

export default withRouter(CustomLayout);

