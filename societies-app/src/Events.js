import React from "react";

import {
    Card,
    Button
} from 'react-bootstrap';

export default class Events extends React.Component{
    constructor (props) {
        super(props)
        this.state = {
            events: [
                {
                    event_name : "Sign Language Lesson 4",
                    society : "Sign Language Society",
                    date : "12/2/20",
                    event_preview : "Learn  some sign language in a relaxed setting!"
                },
                {
                    event_name : "Ratatouille Screening",
                    society : "Film and Media Society",
                    date : "19/2/20",
                    event_preview : "Watch a MASTERPIECE with free food!"
                }
            ]
        }
    }
    componentDidMount() {
        //alert ("hello");
    }

    render () {
        return (
            <div>
                <h1>
                    Events
                </h1>
                <img className='center-img' src="images/societies-logo.png" style={{ width: '100%' }}></img>
                {this.state.events.map(event => {
                    return (
                        <Card>
                            <Card.Img variant="top" src="holder.js/100px180" />
                            <Card.Body>
                                <Card.Title> {event.event_name}</Card.Title>
                                <Card.Text>
                                    <i>{event.event_preview}</i> <br />
                                    {event.society} ({event.date})<br />
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

