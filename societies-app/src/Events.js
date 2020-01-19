import React from "react";

import {
  Card,
  Button,
  Modal,
} from 'react-bootstrap';

import apiGet from './API';
import * as Constants from './Constants';

export default class Events extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      show: false,
      openEventIndex: 0,
      societies: [],
      events: [
        {
          name: "Sign Language Lesson 4",
          society: "Sign Language Society",
          date: "12/2/20",
          event_preview: "Learn some sign language in a relaxed setting!"
        },
        {
          event_name: "Ratatouille Screening",
          society: "Film and Media Society",
          date: "19/2/20",
          event_preview: "Watch a MASTERPIECE with free food!"
        }
      ]
    }
  }

  componentDidMount() {
    apiGet('events', result => {
      console.log('events', result);
      this.setState({
        events: result,
      });
    });

    apiGet('societies', result => {
      console.log('societies', result);
      this.setState({
        societies: result,
      });
    });
  }

  render() {
    return (
      <div>
        <h1>
          Events
        </h1>
        <img className='center-img' src="images/societies-logo.png" style={{ width: '100%' }}></img>
        {this.state.events.map((event, i) => {
          const soc = this.state.societies.find(s => s.id == event.society_id);
          const name = soc ? soc.name : undefined;
          return (
            <div>
              <Card>
                <Card.Body>
                  <Card.Title> {event.name}</Card.Title>
                  <Card.Text>
                    <i>{event.summary}</i> <br />
                    {name ? name : ''} ({Constants.mysqlToJsDate(event.datetime).toLocaleString()})<br />
                  </Card.Text>
                  <Button variant="primary" onClick={() => this.setState({ show: true, openEventIndex: i })}>View event</Button>
                </Card.Body>
              </Card>
            </div>
          )
        })}

        <Modal show={this.state.show} onHide={() => this.setState({ show: false })}>
          <Modal.Header closeButton>
            <Modal.Title>
              {this.state.events[this.state.openEventIndex].name}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <i>{this.state.events[this.state.openEventIndex].summary}</i>
            <br />
            {this.state.events[this.state.openEventIndex].description}
            <br /><br />
            Come along at
            {' '}
            {Constants.mysqlToJsDate(this.state.events[this.state.openEventIndex.datetime]).toLocaleString()}!
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => this.setState({ show: false })}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

