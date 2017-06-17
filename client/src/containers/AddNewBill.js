import React, {Component} from 'react'
import { Form, FormGroup, InputGroup, FormControl, Button, Col, DropdownButton, MenuItem } from 'react-bootstrap'
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';

import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';


import FlatButton from 'material-ui/FlatButton';
import Toggle from 'material-ui/Toggle';

import AddFriends from './AddBill'
import AddBillForm from '../components/AddBillForm'
import BillProgress from '../components/BillProgress'
import BillStats from '../components/BillTable'
import FinalizeBill from '../components/FinalizeBill'

const style = {
  form: {
    width: '50vw'
  },
  img: {
    maxWidth: '100%',
    maxHeight: '100%',
    objectFit: 'contain'
  }
}

class AddNewBill extends Component {
  constructor(props) {
      super(props);
    this.state = {
      uploadedBill: this.props.uploadedBill,
      currentBill: undefined,
      currentFriends: undefined,
      manualBill: true,
      finished: false,
      imagePath: '',
      stepIndex: 0,
      billAction: 'Show Bill',
      open: false,
      billCode: 3
    }
    this.handleBillSubmit = this.handleBillSubmit.bind(this);
    this.addBill = this.addBill.bind(this);
    this.addFriend = this.addFriend.bind(this);
    this.submitFriends = this.submitFriends.bind(this);
    this.handleNext = this.handleNext.bind(this);
    this.getStepContent = this.getStepContent.bind(this);
    this.handlePrev = this.handlePrev.bind(this);
  }

  addBill(billInfo){
    this.setState({currentBill: billInfo}, function(){
     this.handleNext();
    });
  }

  addFriend(debtorsInfo){
    if(this.state.currentFriends !== undefined){
      this.setState( (state) => {
        state.currentFriends = state.currentFriends.concat([debtorsInfo]);
        return state;
     })
    } else {
      this.setState({currentFriends: [debtorsInfo]}, function(){
        console.log('you added a friend', this.state.currentFriends);
      });
    }
  }

  submitFriends(){
    console.log('Got to the final step')
    this.handleNext();
  }

  handleNext(){
    const {stepIndex} = this.state;
    this.setState({
      stepIndex: stepIndex + 1,
      finished: stepIndex >= 2,
    });
  }

  handlePrev (){
    const {stepIndex} = this.state;
    if (stepIndex > 0) {
      this.setState({stepIndex: stepIndex - 1});
    }
  }

  getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return 'Choose a manual or ';
      case 1:
        return 'Add Friends';
      case 2:
        return 'This is the bit I really care about!';
      default:
        return 'You\'re a long way from home sonny jim!';
    }
  }

  handleBillSubmit(){
    let totalDebts = this.state.currentFriends.reduce(function(accum, friend){
      return accum += friend.debtAmount;
    }, 0);
    let imgData = this.state.uploadedBill.split('base64,')[1];

    const sendData = {
      bill : {
      billName: this.state.currentBill.billName,
      code: this.state.currentBill.billCode,
      totalAmount: this.state.currentBill.billTotal,
      totalDebt: totalDebts,
      image: imgData,
      debtors: this.state.currentFriends
    }
  };
      $.ajax({
        type: 'POST',
        url: '/users/submitbill',
        data: JSON.stringify(sendData),
        contentType: 'application/json',
        success: (data) => {
          console.log('Bill Added', data);
        },
        error: (error) => {
          console.log('bill not added', error);
        }
      });
    }

  handleToggle() {
    this.setState({
      open: !this.state.open,
      billAction: 'Hide Bill'
    })
  };


  render() {
    const {currentBill, currentFriends} = this.state
    const { uploadedBill } = this.props
    const { form, img } = style

    let formRender = this.state.stepIndex === 0 ? <AddBillForm addBill={this.addBill} currentBill={this.state.currentBill} /> : this.state.stepIndex === 1 ? <AddFriends addFriend={this.addFriend} currentFriends={this.state.currentFriends} handleAllFriends={this.submitFriends}/> : <FinalizeBill customSettings={this.customSettings} submitBill={this.handleBillSubmit}/>;

    const passedState = {
      stepIndex: this.state.stepIndex,
      finished: this.state.finished
    }
    const styleProps = {
      fixedHeader: true,
      fixedFooter: true,
      stripedRows: false,
      showRowHover: true,
      selectable: false,
      multiSelectable: false,
      enableSelectAll: false,
      deselectOnClickaway: true,
      showCheckboxes: false
    }

    return (
      <div style={form}>
      <div>
      <div>
      <BillStats styleProps={styleProps} debtors={currentFriends} billStats={currentBill}/>
      </div>
      <div>
      <BillProgress handlePrev={this.handlePrev} getStepContent={this.getStepContent} currStep={formRender} handleNext={this.handleNext} passedState={passedState}/>
      <div>
      </div>
      </div>
      </div>
      <div>
        <RaisedButton
          label={this.state.billAction}
          onTouchTap={this.handleToggle.bind(this)}
        />
        <Drawer width={700} openSecondary={true} open={this.state.open} >
        <img style={img} src={uploadedBill}/>
        </Drawer>
      </div>
      </div>
    )
  }
}

export default AddNewBill

