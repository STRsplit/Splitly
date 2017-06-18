import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom';

import axios from 'axios';
import $ from 'jquery';

import UserPage from './containers/UserPage';
import Main from './containers/Main';


class App extends Component {
  constructor (props) {
    super(props)

    this.state = {
      signedIn: true,
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
        </div>
      </Router>

    );
  }
}

export default App

