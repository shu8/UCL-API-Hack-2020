import React from 'react';
import {
  Card,
  Button,
  Modal
} from "react-bootstrap"

export default class Societies extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view_mode: "categories",
      show: false,
      openSocIndex: 0,
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
  }

  renderCat() {
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
                  <Button variant="primary" onClick={() => this.setState({ show: true, openSocIndex: i })}>View society</Button>
                  <br /><br />
                  <Button variant="success" onClick={() => this.followSociety(i)}>Follow society</Button>
                </Card.Body>
              </Card>
              <Modal show={this.state.show} onHide={() => this.setState({ show: false })}>
                <Modal.Header closeButton>

                <Modal.Title>
                  {this.state.societies[this.state.openSocIndex].name}
                  <img src={this.state.societies[this.state.openSocIndex].logo} style={{ width: '25%', float: 'right' }} />

                </Modal.Title>

              </Modal.Header>
              <Modal.Body>{this.state.societies[this.state.openSocIndex].detail}</Modal.Body>
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
      return (
        <div>
          <h1 style={{ textAlign: 'center' }}>
            Societies
            {` (${this.props.match.params.category})`}
          </h1>
        </div>
      )
    } else {
      if (view_mode=="categories") {
        return this.renderCat();
      } else if(view_mode=="all") {
        return this.renderAll();
      }
    }
  }
}
