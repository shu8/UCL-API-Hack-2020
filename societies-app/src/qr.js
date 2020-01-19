import React from "react";
import QrReader from 'react-qr-reader'
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

class Test extends Component {
  state = {
    result: 'No result'
  }
  
  handleScan = data => {
    if (data) {
      this.setState({
        result: data
      })
    }
  }
  handleError = err => {
    console.error(err)
  }

  render() {
    const isLoggedIn = !!window.sessionStorage.getItem('sessionId');

    if (isLoggedIn) {
      return (
        <div>
          Logged in
        </div>
      );
    }

    return (
      <div>
        <h1>Login</h1>
        <Card className='login-container'>
          <Card.Body>
            <Card.Title> Subscribe to Society Newsletters </Card.Title>
            <Card.Text>
              by scanning their QR codes at the UCL Welcome fair!
            </Card.Text>
            <a href={`${Constants.API_URL}/oauth/authorise`}>
              //
            </a>
          </Card.Body>
        </Card>

        <QrReader
          delay={300}
          onError={this.handleError}
          onScan={this.handleScan}
          style={{ width: '100%' }}
        />
        <p>{this.state.result}</p>
        
      </div>
      
    );
  }
}
