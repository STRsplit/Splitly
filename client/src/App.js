import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom';

import axios from 'axios';
import $ from 'jquery';

import UserPage from './containers/UserPage';
import LoginPage from './containers/LoginPage';
import SignupPage from './containers/SignupPage';
import Main from './containers/Main';

/* * * * I DIDN'T TAKE OUT ANY OF THESE FUNCTIONS, THOUGH I CHANGE THE NAME OF ONE - ISLOGGEDIN()
I'LL LET YOU FINALIZE THE AUTHENTICATION SPECIFICS, THOUGH PROVIDED ISLOGGEDIN RETURNS TRUE OR FALSE, THE ROUTING WILL WORK.

RIGHT NOW, THE ROUTES WILL AUTOMATICALLY REDIRECT TO THE USER'S PAGE IF ISLOGGEDIN RETURNS TRUE - MEANING THEY HAVE A VALID SESSION OR ARE LOGGED IN. ALL NESTED ROUTES WITHIN /HOME (e.g., HOME/BILLHISTORY, HOME/FRIENDS ETC.) ARE ALSO PROTECTED. PLEASE DON'T CHANGE THE STRUCTURE OF THESE ROUTES, AS REACT ROUTER VERSION 4 IS A BITCH :) :) :)  * * * */


class App extends Component {
  constructor (props) {
    super(props)

    this.state = {
      signedIn: false,
      user: null
    }
    // this.isLoggedIn();
    // this.requireAuth = this.requireAuth.bind(this);
    this._onSignIn = this._onSignIn.bind(this);
  }


  isLoggedIn (){
    // return this.state.signedIn;
    if (this.state.signedIn) {
      return true;
    } else {
      axios.get('/users/checkStatus')
      .then(data => {
        const { signedIn, user } = data;
        this.setState({signedIn, user})
      })
      .catch(error => {
        console.log(error);
      })
      // $.ajax({
      //   type: 'GET',
      //   url: '/users/checkStatus',
      //   contentType: 'application/json',
      //   success: (data) => {
      //     console.log('WORKED', data);
      //     this.setState({signedIn: data.signedIn, user: data.user});
      //   },
      //   error: (error) => {
      //     console.log('checkUserLogged: user has no session');
      //     // this.setState({accountExistsMessage: 'Account already exists. Use different username or email.'});
      //   }
      // });
      }
  }

  _onSignIn(signIn, user) {
    if (signIn) {
      this.setState({signedIn: signIn, user: user});
    }
  }

  // requireAuth(nextState, replace) {
  //   if (!this.state.signedIn) {
  //     replace({
  //       pathname: '/login'
  //     })
  //   }
  // }

  // checkSession() {
  //   if (this.isLoggedIn()) {
  //     return <Redirect to='/home'/>;
  //   } else {
  //     return <Main signedIn={this.state.signedIn} onSignIn={this._onSignIn}  />;
  //   }

  // }
// MYCAH //

    checkSession() {
    if (this.isLoggedIn()) {
      return <Redirect to='/home'/>;
    } else {
      return <Redirect to='/hello'/>;
    }
  }

  componentDidMount() {

  }

  /* * * THIS WAY WE CAN PASS PROPS THROUGH THE ROUTE * * */
    redirectToMain() {
      console.log('redirect to main')
      return <Main signedIn={this.state.signedIn} onSignIn={this._onSignIn} />
    }

  // render () {
  //   return (
  //     <Router>
  //       <div>
  //         <Route path='/' render={this.checkSession.bind(this)} />
  //         <Route exact path='/home' component={UserPage}/>
  //         <Route path='/signup' component={SignupPage} />
  //       </div>
  //     </Router>
  //   );
  // }

  render () {
    return (
      <Router>
        <div className="mainContainer">
          <Route exact path='/' render={this.checkSession.bind(this)}/>
          <Route path='/hello' render={this.redirectToMain.bind(this)} />
          <Route path='/home' component={UserPage}/>
          <Route path='/home/' render={this.checkSession.bind(this)}/>
          <Route path='/signup' component={SignupPage} />
        </div>
      </Router>

    );
  }
}

export default App

