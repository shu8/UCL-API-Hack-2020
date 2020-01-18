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
            eventsForOpenSoc :[],

            societies: [{
                name: "s1",
                desc: "s1 desc",
                detail: "s1 detailed summary",
                logo: "/uclsslogo.png"
            }, {
                name: "s2",
                desc: "s2 desc",
                detail: "s2 detailed summary",
                logo: "/uclsslogo.png"
            }, {
                name: "s3",
                desc: "s3 desc",
                detail: "s3 detailed summary",
                logo: "/uclsslogo.png"
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
                                <Card.Img  src= {soc.logo} style= {{width: '50%'}} align = 'right'></Card.Img>
                                <Button variant="primary" onClick = {() => this.setState({show: true, openSocIndex: i})}>View society</Button>
                            </Card.Body>
                        </Card>
                        
                    )
                })}
                
                <Modal show={this.state.show} onHide={() => this.setState({show: false})}>
                    <Modal.Header closeButton>

                    <Modal.Title>
                        {this.state.societies[this.state.openSocIndex].name}
                        <img src = {this.state.societies[this.state.openSocIndex].logo} style= {{width: '25%', float: 'right'}} />

                        </Modal.Title>

                    </Modal.Header>
                    <Modal.Body>{this.state.societies[this.state.openSocIndex].detail}</Modal.Body>
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

