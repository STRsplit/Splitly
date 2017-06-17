import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import BaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme'
import * as mui from 'material-ui';

// import IconMenu from 'material-ui/IconMenu';
// import IconButton from 'material-ui/IconButton';
import FlatButton from 'material-ui/FlatButton';
// import FontIcon from 'material-ui/FontIcon';
// import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more';
// import DropDownMenu from 'material-ui/DropDownMenu';
// import MenuItem from 'material-ui/MenuItem';
// import RaisedButton from 'material-ui/RaisedButton';
// import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';

import { Navbar, FormGroup, Nav, FormControl, Button, Overlay, Popover, NavItem, NavDropdown, MenuItem } from 'react-bootstrap'


import NewBillButton from '../components/NewBillButton'
import LogoutButton from '../components/LogoutButton'
import FriendsButton from '../components/FriendsButton'
import NavDropMenu from '../components/NavDropMenu'


class UserNavBar extends Component {
  render () {
    const { uploadBill, logOut } = this.props

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
            <NavItem eventKey={1}>
            <LogoutButton logOut={logOut}/></NavItem>
          <NavItem eventKey={2}> <NewBillButton uploadBill={uploadBill}/></NavItem>
          <NavItem eventKey={3}><FriendsButton /></NavItem>
          <NavItem eventKey={4}><NavDropMenu/></NavItem>
        </Nav>       
          
        </Navbar.Collapse>
      </Navbar>
    );
  }
}


export default UserNavBar
