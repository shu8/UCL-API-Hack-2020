import React from "react";
import QrReader from 'react-qr-reader'
import * as Constants from './Constants';
import {
  Card,
  Button
} from 'react-bootstrap';

export default class QR extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      result: 'No result'
    }
  }
  
  handleScan = data => {
    if (data) {
      this.setState({
        result: data
      })
    }
    this.props.history.push('/society/');
  }
  handleError = err => {
    console.error(err)
  }

  render() {

    return (
      <div>
        <h1> Newsletter subscription </h1>
        <Card className='login-container'>
          <Card.Body>
            <Card.Title> Subscribe to Society Newsletters </Card.Title>
            <Card.Text>
              by scanning their QR codes at the UCL Welcome fair!
            </Card.Text>
            <QrReader
              delay={300}
              onError={this.handleError}
              onScan={this.handleScan}
              style={{ width: '100%' }}
            />
            <p> This looks like {this.state.result} </p>
          </Card.Body>
        </Card>
      </div>
      
    );
  }
}
