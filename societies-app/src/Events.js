import React from "react";

import {
  Card,
  Button
} from 'react-bootstrap';

import apiGet from './API';
import * as Constants from './Constants';

export default class Events extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
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
        {this.state.events.map(event => {
          const soc = this.state.societies.find(s => s.id == event.society_id);
          const name = soc ? soc.name : undefined;
          return (
            <Card>
              {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
              <Card.Body>
                <Card.Title> {event.name}</Card.Title>
                <Card.Text>
                  <i>{event.summary}</i> <br />
                  {name ? name : ''} ({Constants.mysqlToJsDate(event.datetime).toLocaleString()})<br />
                  {event.description}
                </Card.Text>
                <Button variant="primary">View event</Button>
              </Card.Body>
            </Card>
          )
        })};
      </div>
    );
  }
}

