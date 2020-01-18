import React from 'react';
import {
    Card,
    Button
} from "react-bootstrap"

export default class Societies extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            societies: [{
                name: "s1",
                desc: "s1 desc"
            }, {
                name: "s2",
                desc: "s2 desc"
            }]
        }
    }

    componentDidMount() {
        // TODO API call, set setState({societies: [api result]})
    }

    render() {
        return (
            <div>
                <h1>
                    Societies
                </h1>
                <img className='center-img' src="images/societies-logo.png" style={{width: '100%'}}></img>
                {this.state.societies.map(soc => {
                    return (
                        <Card>
                            <Card variant="top" src="holder.js/100px180" />
                            <Card.Body>
                                <Card.Title>{soc.name}</Card.Title>
                                <Card.Text><i>{soc.desc}</i></Card.Text>
                                <Button variant="primary">View society</Button>
                            </Card.Body>
                        </Card>
                    )
                })}
            </div>
        );
    }
}

