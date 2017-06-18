import React, { Component } from 'react'
import { Modal, Button } from 'react-bootstrap'
import LoginForm from './LoginPage'
import SignUpForm from './Signup'

const style = {
  modalContainer: {
     position: 'relative',
     display: 'block',
     height: '500px'
  },
  modalContainer: {
      position: 'absolute'
  }
}

const LoginModal = (props) => {
  return (
    <div className="modal-container" style={style.modalContainer}>

      <Modal
        bsSize="large"
        show={props.show}
        onHide={close}
        container={this}
        aria-labelledby="contained-modal-title"
      >
        <Modal.Header closeButton onClick={props.handleClick}>
          <Modal.Title id="contained-modal-title">{props.type}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div className='modal-body-interior'>
         {props.type === 'login' ? <LoginForm /> : <SignUpForm />}
         </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.handleClick}>Close</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};


export default LoginModal