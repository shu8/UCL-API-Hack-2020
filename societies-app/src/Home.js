import React from "react";
import * as Constants from './Constants';
import {
  Card,
  Button
} from 'react-bootstrap';
import Societies from "./Societies";

export default class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      success: false,
    };
  }

  componentDidMount() {
    const sessionId = window.sessionStorage.getItem('sessionId');
    // TODO make api call, check if success
    // TODO change that to check if success
    const success = !!sessionId;
    this.setState({ isLoggedIn: success });
  }

  render() {
    if (this.state.isLoggedIn) {
      return <Societies />;
    }

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
            <a href={`${Constants.BASE_API_URL}/oauth/authorise`}>
              <Button variant="primary">Login with UCL</Button>
            </a>
          </Card.Body>
        </Card>
      </div>
    );
  }
}
