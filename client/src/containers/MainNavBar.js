import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { Navbar, FormGroup, Nav, FormControl, Button, Overlay, Popover, NavItem, NavDropdown, MenuItem } from 'react-bootstrap'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import BaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme'
import UserNavBar from './UserNavBar';

import NavDropMenu from '../components/NavDropMenu'
import Login from '../containers/Login'
// import { Link } from 'react-router-dom';
// import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import FlatButton from 'material-ui/FlatButton';

class MainNavBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      signedIn: true
    };

    this._handleLogin = this._handleLogin.bind(this);
  }

  _handleLogin(signIn, user) {
    this.props.onSignIn(signIn, user);
    this.setState({signedIn: signIn});
  }

  render() {

    // const loggedInOptions = <Nav pullRight>
    //                           <NewBillButton />
    //                           <FriendsButton />
    //                           <NavDropMenu />
    //                         </Nav>;

    // const loginNode = <Login onSignIn={this._handleLogin}   />;

    // let displayNode;
    // if (this.state.signedIn) {
    //   displayNode = loggedInOptions;
    // } else {
    //   displayNode = loginNode;
    // }
    let navItems = this.state.signedIn ? ['Logout', 'Upload Bill', 'Add Friends'] : ['About', 'About2', 'About3'];
  
    

    return (
      <Navbar fluid className="navbar navbar-fixed-top navbar-default">
        <Navbar.Header>
          <Navbar.Brand>
            <a href="#">Splitly</a>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
        <Nav>
        {navItems.map((item, idx) => {
          return <NavItem eventKey={idx + 1} href="#"><FlatButton label={item}></FlatButton></NavItem>     
        })}

        </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default MainNavBar


/* Backup for now

 // <Login onSignIn={this._handleLogin}   />


*/
