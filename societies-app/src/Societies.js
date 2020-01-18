import React from 'react';
import {
    Card,
    Button, 
    Modal
} from "react-bootstrap"

export default class Societies extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            show: false, 
            openSocIndex: 0,

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
                {this.state.societies.map((soc, i) => {
                    return (
                        <Card>
                            <Card variant="top" src="holder.js/100px180" />
                            <Card.Body>
                                <Card.Title>{soc.name}</Card.Title>
                                <Card.Text><i>{soc.desc}</i></Card.Text>
                                <Button variant="primary" onClick = {() => this.setState({show: true, openSocIndex: i})}>View society</Button>
                            </Card.Body>
                        </Card>
                        
                    )
                })}
                <Modal show={this.state.show} onHide={() => this.setState({show: false})}>
                    <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Woohoo, you're reading this text in a modal! {this.state.openSocIndex}</Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={() => this.setState({show: false})}>
                        Close
                    </Button>
                    </Modal.Footer>
                </Modal>
            </div>

        );
    }
}

