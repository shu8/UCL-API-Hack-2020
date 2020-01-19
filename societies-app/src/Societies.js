import React from 'react';
import {
  Card,
  Button,
  Modal
} from "react-bootstrap"

import * as API from "./API";
import { mysqlToJsDate } from './Constants';

export default class Societies extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view_mode: "categories",
      show: false,
      openSocIndex: 0,
      eventsForOpenSoc: [],
      modalType: "vsoc",

      faqs: [{
        society_id: "123",
        question: "test question1?",
        answer: "test answer1"
      },
      {
        society_id: "124",
        question: "test question2?",
        answer: "test answer2"
      },
      {
        society_id: "125",
        question: "test question3?",
        answer: "test answer3"
      }],

      societies: [{
        soc_id: "123",
        name: "s1",
        description: "s1 desc",
        category: "Technology",
        detail: "s1 detailed summary",
        logo: "/uclsslogo.png"
      }, {
        soc_id: "124",
        name: "s2",
        desc: "s2 desc",
        category: "Medicine",
        detail: "s2 detailed summary",
        logo: "/uclsslogo.png"
      }, {
        soc_id: "125",
        name: "s3",
        desc: "s3 desc",
        category: "Medicine",
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
          name: "Common Interest",
          logo: "/uclsslogo.png"
        },
        {
          name: "Academic Related",
          logo: "/uclsslogo.png"
        },
        {
          name: "Fan-clubs",
          logo: "/uclsslogo.png"
        },
        {
          name: "Arts",
          logo: "/uclsslogo.png"
        }
      ],

      events: [],
    }
  }

  componentDidMount() {
    API.apiGet('societies', result => {
      console.log('societies', result);
      this.setState({
        societies: result,
      });
    });

    API.apiGet('faqs', result => {
      console.log('faqs', result);
      this.setState({
        faqs: result,
      });
    });

    API.apiGet('events', result => {
      console.log('events', result);
      this.setState({
        events: result,
      });
    });
  }

  followSociety(socIndex) {
    console.log('FOLLOWING', this.state.societies[socIndex].id);
    API.apiPost('/following', {
      society_id: this.state.societies[socIndex].id,
    }, result => {
      console.log(result);
    });
  }

  catCard(cat, socIndex) {
    return (
      <Card>
        <Card variant="top" src="holder.js/100px180" />
        <Card.Body>
          <Card.Title>{cat.name}</Card.Title>
          <Card.Text><i>{cat.desc}</i></Card.Text>
          <Card.Img src={cat.logo} style={{ width: '50%' }} align='right'></Card.Img>
          <Button variant="primary" onClick={() => this.setState({ show: true, openSocIndex: socIndex, modalType: "vsoc" })}>View society</Button>
          <br /><br />
          <Button variant="success" onClick={() => this.followSociety(socIndex)}>Follow society</Button>
          <br /><br />
          <Button variant="secondary" onClick={() => this.setState({ show: true, openSocIndex: socIndex, modalType: "faq" })}>View FAQ</Button>
        </Card.Body>
      </Card>
    );
  }

  renderModal() {
    console.log(this.state);
    const soc = this.state.societies[this.state.openSocIndex];
    console.log('SOCC', soc);
    return (
      <Modal show={this.state.show} onHide={() => this.setState({ show: false })}>
        <Modal.Header closeButton>
          <Modal.Title>
            {soc.name}
            <img src={soc.logo} style={{ width: '25%', float: 'right' }} />
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>{this.renderModalBody()}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => this.setState({ show: false })}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }

  socCard(soc, socIndex) {
    return (
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
    );
  }

  renderModalBody() {
    if (this.state.modalType === 'faq') {
      const faqs = this.state.faqs.map((faq, i) => ({
        index: i,
        faq,
      })).filter(faq => faq.faq.society_id == this.state.societies[this.state.openSocIndex].id);

      return faqs.length ? (
        <div>
          <h2>FAQs</h2>
          {
            faqs.map(faq => (
              <p>
                <strong>
                  {faq.faq.question}
                </strong>
                <br />
                <i>
                  {faq.faq.answer}
                </i>
              </p>
            ))
          }
        </div>
      ) : (
        <div>
          There are no FAQs yet!
        </div>
      )
    } else {
      const soc = this.state.societies[this.state.openSocIndex];
      const events = this.state.events.filter(e => e.society_id == soc.id);

      return (
        <div>
          <img className='soc-modal-image' src={soc.image} />
          <strong>{soc.description}</strong>
          <hr />
          {events.length
            ? (
              <div>
                <h4>Events</h4>
                {events.map(ev => (
                  <p>
                    {ev.name}
                    {' '}
                    ({mysqlToJsDate(ev.datetime).toLocaleString()})
                    <br />
                    <i className='event-modal-desc'>{ev.description}</i>
                  </p>
                ))}
              </div>
            ) : ''}

        </div>
      )
    }
  }

  renderAllCats() {
    return (
      <div>
        <h1 style={{ textAlign: 'center' }}>
          Societies
          <Button variant="primary" className="float-right" onClick={() => this.setState({ view_mode: "all" })}>Toggle</Button>
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
    const socs = this.state.societies.map((soc, i) => ({
      index: i,
      soc,
    })).filter(soc => soc.soc.category === desiredCat);

    if (!socs.length) {
      return (
        <div>
          <h1 style={{ textAlign: 'center' }}>
            Societies
          {` (${this.props.match.params.category})`}
          </h1>
          <div>
            There are no societies in this category yet!
          </div>
        </div>
      );
    }

    return (
      <div>
        <h1 style={{ textAlign: 'center' }}>
          Societies
          {` (${this.props.match.params.category})`}
        </h1>
        {socs.map(soc => {
          return (
            <div>
              {this.socCard(soc.soc, soc.index)}
              {this.renderModal()}
            </div>
          )
        })}
      </div>
    );
  }

  renderSoc(desiredSoc) {
    console.log(desiredSoc)
    const socIndex = this.state.societies.findIndex(s => s.id == desiredSoc);
    const soc = this.state.societies[socIndex];
    if (!soc) return <div />;
    return (
      <div>
        {this.socCard(soc, socIndex)}
        {this.renderModal()}
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
              {this.socCard(soc, i)}
              {this.renderModal()}
            </div>
          );
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
