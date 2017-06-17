import React, { Component } from 'react'
import { Modal, Button } from 'react-bootstrap'
import LoginPage from '../containers/LoginPage'

const style = {
  modalContainer: {
     position: 'relative',
     height: '200px'
  },
  modalContainer: {
      position: 'absolute'
  }
}

const LoginModal = (props) => {

    return (
      <div className="modal-container" style={style.modalContainer}>

        <Modal
          show={props.show}
          onHide={close}
          container={this}
          aria-labelledby="contained-modal-title"
        >
          <Modal.Header closeButton onClick={props.handleClick}>
            <Modal.Title id="contained-modal-title">Contained Modal</Modal.Title>
          </Modal.Header>
          <Modal.Body>
           <LoginPage />
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={props.handleClick}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
};


export default LoginModal