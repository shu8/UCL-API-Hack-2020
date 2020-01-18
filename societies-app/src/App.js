import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import Societies from "./Societies"
import Events from "./Events";

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
        </Switch>
      </div>
    </Router>
  );
}

// You can think of these components as "pages" in your app
function Home() {
  return (
    <div>
      <h2>Home</h2>
    </div>
  );
}
