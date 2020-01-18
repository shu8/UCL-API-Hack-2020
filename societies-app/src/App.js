import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import Home from "./Home";
import Societies from "./Societies";
import Events from "./Events";
import Admin from "./Admin";

export default function SocietiesApp() {
  return (
    <Router>
      <div>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/societies">Societies</Link>
          </li>
          <li>
            <Link to="/events">Events</Link>
          </li>
        </ul>

        <hr />

        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/societies">
            <Societies />
          </Route>
          <Route path="/events">
            <Events />
          </Route>
          <Route path="/admin">
            <Admin />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
