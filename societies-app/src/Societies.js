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
    super(props);
    this.state = {
      view_mode: "categories",
      show: false,
      openSocIndex: 0,
      eventsForOpenSoc: [],
      modalType: "vsoc",

      faq: [{
        soc_id: "123",
        question: "test question1?",
        answer: "test answer1"
      },  
      {
        soc_id: "124",
        question: "test question2?",
        answer: "test answer2"
      },
      {
        soc_id: "125",
        question: "test question3?",
        answer: "test answer3"
      }],

      societies: [{
        soc_id: "123",
        name: "s1",
        desc: "s1 desc",
        categories: ["Technology", "Medicine"],
        detail: "s1 detailed summary",
        logo: "/uclsslogo.png"
      }, {
        soc_id: "124",
        name: "s2",
        desc: "s2 desc",
        categories: ["Medicine"],
        detail: "s2 detailed summary",
        logo: "/uclsslogo.png"
      }, {
        soc_id: "125",
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

  componentDidMount() {
    // TODO call API, get societies, store in state
    // TODO API call, set setState({societies: [api result]})
    apiGet("societies", Constants.SESSION_ID, result => {
      this.setState({ societies: result })
    })
  }

  renderModalBody() {
    console.log(this.state)
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

  renderAllCats() {
    return (
      <div>
        <h1 style={{ textAlign: 'center' }}>
          Societies
          <Button variant="primary" className="float-right" onClick={() => this.setState({ view_mode: "all"})}>Toggle</Button>
        </h1>
        {this.state.categories.map((cat, i) => {
          return (
            <Card bg="light" style={{ width: '100%' }} onClick={() => this.props.history.push(`/societies/${cat.name}`)}>
              <Card.Body>
                <Card.Title>{cat.name}</Card.Title>
                <Card.Img src={cat.logo} style={{ width: '50%' }} align='right'></Card.Img>
              </Card.Body>
            </Card>
          );
        })}
      </div>
    );
  }

  renderCat(desiredCat) {
    return (
      <div>
        <h1 style={{ textAlign: 'center' }}>
          Societies
          {` (${this.props.match.params.category})`}
        </h1>
        {this.state.societies.filter(soc => soc.categories.includes(desiredCat)).map((cat, i) => {
          return (
            <div>
              <Card>
                <Card variant="top" src="holder.js/100px180" />
                <Card.Body>
                  <Card.Title>{cat.name}</Card.Title>
                  <Card.Text><i>{cat.desc}</i></Card.Text>
                  <Card.Img src={cat.logo} style={{ width: '50%' }} align='right'></Card.Img>
                  <Button variant="primary" onClick={() => this.setState({ show: true, openSocIndex: i, modalType: "vsoc" })}>View society</Button>
                  <br /><br />
                  <Button variant="success" onClick={() => this.followSociety(i)}>Follow society</Button>
                  <br /><br />
                  <Button variant="secondary" onClick={() => this.setState({ show: true, openSocIndex: i, modalType: "faq" })}>View FAQ</Button>
                </Card.Body>
              </Card>
              <Modal show={this.state.show} onHide={() => this.setState({ show: false })}>
                <Modal.Header closeButton>

                <Modal.Title>
                  {this.state.societies[this.state.openSocIndex].name}
                  <img src={this.state.societies[this.state.openSocIndex].logo} style={{ width: '25%', float: 'right' }} />

                </Modal.Title>

              </Modal.Header>
              <Modal.Body>{this.renderModalBody()}</Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={() => this.setState({ show: false })}>
                  Close
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
          )
        })}
      </div>
    );
  }

  renderSoc(desiredSoc) {
    const socIndex = this.state.societies.findIndex(s => s.id === desiredSoc);
    const soc = this.state.societies[socIndex];
    return (
      <div>
        <Card>
          <Card variant="top" src="holder.js/100px180" />
          <Card.Body>
            <Card.Title>{soc.name}</Card.Title>
            <Card.Text><i>{soc.desc}</i></Card.Text>
            <Card.Img src={soc.logo} style={{ width: '50%' }} align='right'></Card.Img>
            <Button variant="primary" onClick={() => this.setState({ show: true, openSocIndex: socIndex, modalType: "vsoc" })}>View society</Button>
            <br /><br />
            <Button variant="success" onClick={() => this.followSociety(socIndex)}>Follow society</Button>
            <br /><br />
            <Button variant="secondary" onClick={() => this.setState({ show: true, openSocIndex: socIndex, modalType: "faq" })}>View FAQ</Button>
          </Card.Body>
        </Card>
        <Modal show={this.state.show} onHide={() => this.setState({ show: false })}>
          <Modal.Header closeButton>

            <Modal.Title>
              {this.state.societies[this.state.openSocIndex].name}
              <img src={this.state.societies[this.state.openSocIndex].logo} style={{ width: '25%', float: 'right' }} />
            </Modal.Title>

          </Modal.Header>
          <Modal.Body>{this.renderModalBody()}</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => this.setState({ show: false })}>
              Close
                </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }

  renderAll() {
    return (
      <div>
        <h1 style={{ textAlign: 'center' }}>
          Societies
          <Button variant="primary" className="float-right" onClick={() => this.setState({ view_mode: "categories"})}>Toggle</Button>
        </h1>
        {this.state.societies.map((soc, i) => {
          return (
            <div>
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
              <Modal show={this.state.show} onHide={() => this.setState({ show: false })}>
                <Modal.Header closeButton>

                <Modal.Title>
                  {this.state.societies[this.state.openSocIndex].name}
                  <img src={this.state.societies[this.state.openSocIndex].logo} style={{ width: '25%', float: 'right' }} />
                </Modal.Title>

              </Modal.Header>
              <Modal.Body>{this.renderModalBody()}</Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={() => this.setState({ show: false })}>
                  Close
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
          )
        })}
      </div>
    );
  }

  handleLoginClick() {
    this.setState({view_mode: "categories"});
  }

  handleLogoutClick() {
    this.setState({view_mode: "all"});
  }

  render() {
    const { view_mode } = this.state //destucture state
    if (this.props.match.params.category) {
      return this.renderCat(this.props.match.params.category);
    } else if (this.props.match.params.id) {
      return this.renderSoc(this.props.match.params.id);
    } else {
      if (view_mode=="categories") {
        return this.renderAllCats();
      } else if (view_mode=="all") {
        return this.renderAll();
      }
    }
  }
}
