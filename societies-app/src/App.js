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
import Interests from "./Interests";

export default function SocietiesApp() {
  return (
    <Router>
      <div>
        <Link className= "navbar" to="/">Home</Link>
        <Link className= "navbar" to="/societies">Societies</Link>
        <Link className= "navbar" to="/events">Events</Link>
        <hr />

        <Switch>
          <Route exact path="/">
            <Home />
          </Route>

          <Route
            path="/societies/:category"
            component={Societies}
          />
          <Route path="/societies"
            component={Societies}
          />

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
