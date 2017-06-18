import React from 'react'
import { Navbar, Form, FormGroup, Col, Checkbox, Nav, ControlLabel, FormControl, Button } from 'react-bootstrap'

const SignUpPage = (props) => (
  <Form horizontal>
    <FormGroup controlId="formHorizontalEmail">
      <Col componentClass={ControlLabel} sm={2}>
        Email
      </Col>
      <Col sm={10}>
        <FormControl type="email" placeholder="Email" />
      </Col>
    </FormGroup>
    <FormGroup controlId="formHorizontalEmail">
      <Col componentClass={ControlLabel} sm={2}>
        First Name
      </Col>
      <Col sm={10}>
        <FormControl type="firstName" placeholder="First Name" />
      </Col>
    </FormGroup>
    <FormGroup controlId="formHorizontalEmail">
      <Col componentClass={ControlLabel} sm={2}>
        Last Name
      </Col>
      <Col sm={10}>
        <FormControl type="lastName" placeholder="Last Name" />
      </Col>
    </FormGroup>
    <FormGroup controlId="formHorizontalPassword">
      <Col componentClass={ControlLabel} sm={2}>
        Password
      </Col>
      <Col sm={10}>
        <FormControl type="password" placeholder="Password" />
      </Col>
    </FormGroup>
    <FormGroup controlId="formHorizontalPassword">
      <Col componentClass={ControlLabel} sm={2}>
        Confirm Password
      </Col>
      <Col sm={10}>
        <FormControl type="password" placeholder="Confirm Password" />
      </Col>
    </FormGroup>

    <FormGroup>
      <Col smOffset={2} sm={10}>
        <Checkbox>Remember me</Checkbox>
      </Col>
    </FormGroup>

    <FormGroup>
      <Col smOffset={2} sm={10}>
        <Button type="submit">
          Sign in
        </Button>
      </Col>
    </FormGroup>
  </Form>
);

export default SignUpPage