import React from 'react';
import {
  Card,
  Button,
  Modal
} from "react-bootstrap"

import apiGet from "./API";
import * as Constants from "./Constants"

export default class Societies extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      show: false,
      openSocIndex: 0,
      eventsForOpenSoc: [],
      modalType: "vsoc",

      faq: [{
        soc_id: "000",
        question: "test question1?",
        answer: "test answer1"
      },
      {
        soc_id: "001",
        question: "test question2?",
        answer: "test answer2"
      },
      {
        soc_id: "002",
        question: "test question3?",
        answer: "test answer3"
      }],

      societies: [{
        soc_id: "000",
        name: "s1",
        desc: "s1 desc",
        categories: ["Technology", "Medicine"],
        detail: "s1 detailed summary",
        logo: "/uclsslogo.png"
      }, {
        soc_id: "001",
        name: "s2",
        desc: "s2 desc",
        categories: ["Medicine"],
        detail: "s2 detailed summary",
        logo: "/uclsslogo.png"
      }, {
        soc_id: "002",
        name: "s3",
        desc: "s3 desc",
        categories: ["Sports"],
        detail: "s3 detailed summary",
        logo: "/uclsslogo.png"
      }],
      categories: [
        {
          name: "Technology",
          logo: "/uclsslogo.png"
        },
        {
          name: "Medicine",
          logo: "/uclsslogo.png"
        },
        {
          name: "Music",
          logo: "/uclsslogo.png"
        },
        {
          name: "Sports",
          logo: "/uclsslogo.png"
        },
        {
          name: "Educational",
          logo: "/uclsslogo.png"
        },
        {
          name: "Fan-clubs",
          logo: "/uclsslogo.png"
        },
        {
          name: "Free",
          logo: "/uclsslogo.png"
        }
      ]
    }
  }

  followSociety(socIndex) {
    console.log(socIndex);
    // TODO API call, with followed society id
  }

  componentDidMount() {
    // TODO API call, set setState({societies: [api result]})
    apiGet("societies", Constants.SESSION_ID, result => {
      this.setState({ societies: result })
    })
  }

  renderModalBody() {
    if (this.state.modalType === 'faq') {
      return (
        <div>
          {this.state.faq.find(f => f.soc_id === this.state.societies[this.state.openSocIndex].soc_id).question}
          <br /> <br />
          {this.state.faq.find(f => f.soc_id === this.state.societies[this.state.openSocIndex].soc_id).answer}
        </div>
      )
    } else {
      return (
        <div>
          {this.state.societies[this.state.openSocIndex].detail}

        </div>
      )
    }
  }
  render() {
    return (
      <div>
        <h1>
          Societies
        </h1>
        <img className='center-img' src="images/societies-logo.png" style={{ width: '100%' }}></img>
        {this.state.societies.map((soc, i) => {
          return (
            <Card>
              <Card variant="top" src="holder.js/100px180" />
              <Card.Body>
                <Card.Title>{soc.name}</Card.Title>
                <Card.Text><i>{soc.desc}</i></Card.Text>
                <Card.Img src={soc.logo} style={{ width: '50%' }} align='right'></Card.Img>
                <Button variant="primary" onClick={() => this.setState({ show: true, openSocIndex: i, modalType: "vsoc" })}>View society</Button>
                <br /><br />
                <Button variant="success" onClick={() => this.followSociety(i)}>Follow society</Button>
                <br /><br />
                <Button variant="secondary" onClick={() => this.setState({ show: true, openSocIndex: i, modalType: "faq" })}>View FAQ</Button>

              </Card.Body>
            </Card>
          )
        })}

        <Modal show={this.state.show} onHide={() => this.setState({ show: false })}>
          <Modal.Header closeButton>
            <Modal.Title>
              {this.state.societies[this.state.openSocIndex].name}
              {this.state.modalType === 'faq' ? ' (FAQ)' : ''}
              <img src={this.state.societies[this.state.openSocIndex].logo} style={{ width: '25%', float: 'right' }} />
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {this.renderModalBody()}
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

