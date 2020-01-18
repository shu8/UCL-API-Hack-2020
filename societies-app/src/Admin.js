import React from 'react';
import {
  Form,
  Button,
} from "react-bootstrap"

export default class Admin extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      show: false,
      openSocIndex: 0,
      type: '',
    }
  }

  componentDidMount() {
    // TODO API call, set setState({societies: [api result]})
  }

  renderForm() {
    if (this.state.type == 'society') {
      return (
        <div>
          <Button style={{ float: 'left' }} onClick={() => this.setState({ type: 'society' })}>Register new society</Button>
          <Button style={{ float: 'right' }} onClick={() => this.setState({ type: 'event' })}>Register new event</Button>
          <h1>Register your society</h1>
          <img src="images/societies-logo.png" style={{ width: '100%' }}></img>
          <br />
            Register your society so students can find out more about it!
          <hr />
          <Form>
            <Form.Group>
              <Form.Label>Society Name</Form.Label>
              <Form.Control type="text" placeholder="Enter society name" />
            </Form.Group>

            <Form.Group>
              <Form.Label>Society Summary</Form.Label>
              <Form.Control type="text" placeholder="Enter a short summary" />
            </Form.Group>

            <Form.Group>
              <Form.Label>Description</Form.Label>
              <Form.Control as='textarea' placeholder="Enter your society's description" />
            </Form.Group>

            <Form.Group>
              <Form.Label>Categories</Form.Label>
              <Form.Control as="select" multiple>
                <option>Entertainment</option>
                <option>Education</option>
                <option>Social</option>
              </Form.Control>
            </Form.Group>
            <Button variant="primary" type="submit">Submit</Button>
          </Form>
        </div>
      );
    }

    if (this.state.type == 'event') {
      return (
        <div>
          <Button style={{ float: 'left' }} onClick={() => this.setState({ type: 'society' })}>Register new society</Button>
          <Button style={{ float: 'right' }} onClick={() => this.setState({ type: 'event' })}>Register new event</Button>
          <h1>Create a new event</h1>
          <img src="images/societies-logo.png" style={{ width: '100%' }}></img>
          Create a new event for your society so students can easily find it!
          <hr />
          <Form>
            <Form.Group>
              <Form.Label>Society</Form.Label>
              <Form.Control as="select" multiple>
                <option>TechSoc</option>
                <option>Harry Potter Society</option>
                <option>Badminton Society</option>
              </Form.Control>
            </Form.Group>

            <Form.Group>
              <Form.Label>Event Name</Form.Label>
              <Form.Control type="text" placeholder="Enter society name" />
            </Form.Group>

            <Form.Group>
              <Form.Label>Event Summary</Form.Label>
              <Form.Control type="text" placeholder="Enter a short summary" />
            </Form.Group>

            <Form.Group>
              <Form.Label>Description</Form.Label>
              <Form.Control as='textarea' placeholder="Enter your society's description" />
            </Form.Group>

            <Form.Group controlId="exampleForm.ControlSelect2">
              <Form.Label>Categories</Form.Label>
              <Form.Control as="select" multiple>
                <option>Entertainment</option>
                <option>Education</option>
                <option>Social</option>
              </Form.Control>
            </Form.Group>
            <Button variant="primary" type="submit">Submit</Button>
          </Form>
        </div>
      );
    }
  }

  render() {
    if (!this.state.type) {
      return (
        <div>
          <Button style={{ float: 'left' }} onClick={() => this.setState({ type: 'society' })}>Register new society</Button>
          <Button style={{ float: 'right' }} onClick={() => this.setState({ type: 'event' })}>Register new event</Button>
        </div>
      );
    }

    return this.renderForm();
  }
}

