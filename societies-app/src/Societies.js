import React from 'react';
import {
  Card
} from "react-bootstrap"

export default class Interests extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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

  render() {
    if (this.props.match.params.category) {
      return (
        <div>
          <h1 style={{ textAlign: 'center' }}>
            Societies
            {` (${this.props.match.params.category})`}
          </h1>
          SOCIETIES IN THIS CATEGORY
        </div>
      )
    } else {
      return (
        <div>
          <h1 style={{ textAlign: 'center' }}>
            Societies
          </h1>
          {this.state.categories.map((cat, i) => {
            return (
              <Card bg="light" style={{ width: '100%' }} onClick={() => this.props.history.push(`/societies/${cat.name}`)}>
                <Card.Body>
                  <Card.Title>{cat.name}</Card.Title>
                  <Card.Img src={cat.logo} style={{ width: '50%' }} align='right'></Card.Img>
                </Card.Body>
              </Card>
            )
          })}
        </div>
      )
    }
  }
}
