import React from "react";

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
        return <h1>Events</h1>
    }
}

