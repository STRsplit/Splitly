import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Main from './Main';
import AddNewBill from './AddNewBill';
import UserSummary from './UserSummary';
import UserNavBar from './UserNavBar';
import UserBillsTable from './UserBillsTable'
import FriendsList from './FriendsList';
import AddFriend from './AddFriend';
import BillHistory from './BillHistory';
import Settings from './Settings';

class UserPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uploadedBill: '',
      currentBill: null,
      currentFriends: null
    }
  }

  uploadBill (uploadedBill, callback) {
    this.setState({ uploadedBill: uploadedBill.src }, callback)
    console.log(this.state)
  }

  addBill(billInfo){
    console.log('GOT HERE BRUH', billInfo);
    this.setState({currentBill: billInfo })
  }

  addFriend(friendsInfo){
    if(this.state.currentFriends !== null){
      this.setState( (state) => {
        state.currentFriends = state.currentFriends.concat([friendsInfo]);
        return state;
     })
    } else{
      this.setState({currentFriends: [friendsInfo]});
    }
  }

  logOut(){
    $.ajax({
      type: 'GET',
      url: '/users/logout',
      contentType: 'application/json',
      success: (data) => {

      },
      error: (error) => {
        console.log('checkUserLogged: user has no session');
      }
    });
  }

  /* * * THIS ALLOWS US TO PASS PROPS THROUGH THE ROUTE * * */
   addNewBillWithProps() {
     return (
       <AddNewBill
         uploadedBill={this.state.uploadedBill}
         billStats={this.state}
         addFriend={this.addFriend.bind(this)}
         addBill={this.addBill.bind(this)}
       />
     )
   }

   redirectLogout() {
     console.log('redirect to main')
     return <Main signedIn={this.state.signedIn} onSignIn={this._onSignIn} />
   }

  render() {
   const { uploadBill, logOut, addBill, addFriend } = this;

    return (
      <Router>
      <div style={{'display': 'flex', 'justifyContent': 'space-between'}}>
        <UserNavBar logOut={logOut.bind(this)} uploadBill={uploadBill.bind(this)}/>
        {/* * * THIS COMPONENT BELOW THE NAV BAR WILL CONDITIONALLY RENDER * * * */}
        <Route exact path='/home' component={ UserBillsTable }/>
        <Route path='/home/friends' component={ FriendsList } />
        <Route
          path='/home/addnewbill'
          render={ this.addNewBillWithProps.bind(this) } />
        <Route path='/home/addfriend' component={ AddFriend } />
        <Route path='/home/billhistory' component={ BillHistory } />
        <Route path='/home/settings' component={ Settings } />
        <Route path='/goodbye' render={this.redirectLogout.bind(this)} />

        </div>
      </Router>
    );
  }
}
export default UserPage;

