import React from "react";
import * as Constants from './Constants';
import {
  Card,
  Button
} from 'react-bootstrap';

export default class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {};
  }

  render() {
    return (
      <div>
        <h1>Login</h1>
        <Card className='login-container'>
          <Card.Img variant="top" src="sign-in.png" />
          <Card.Body>
            <Card.Title>Authorisation</Card.Title>
            <Card.Text>
              To use the Societies App, you need to login with UCL.
            </Card.Text>
            <a href={`${Constants.API_URL}/login`}>
              <Button variant="primary">Login with UCL</Button>
            </a>
          </Card.Body>
        </Card>
      </div>
    );
  }
}
