import React from "react";

import {
    Card,
    Button
} from 'react-bootstrap';

export default class Events extends React.Component{
    constructor (props) {
        super(props)
        this.state = {
            events: []
        }
    }
    componentDidMount() {
        //alert ("hello");
    }

    render () {
        return (
            
            <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src="holder.js/100px180" />
                <Card.Body>
                    <Card.Title>Event 1</Card.Title>
                    <Card.Text> Society it's run by <br/>
                    Event date <br/>
                    This is where the event preview will go. <br/>
                    </Card.Text>
                    <Button variant="primary"> Go to event page </Button>
                </Card.Body>
                </Card>
            
)
    }
}

