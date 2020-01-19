import React from "react";
import querystring from 'querystring';
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
import QR from "./QR";

export default function SocietiesApp() {
  return (
    <Router>
      <div>
        <Link className="navbar" to="/">Home</Link>
        <Link className="navbar" to="/societies">Societies</Link>
        <Link className="navbar" to="/events">Events</Link>
        <Link className="navbar" to="/logout">Logout</Link>
        <Link className= "navbar" to="/qr">QR</Link>
        <hr />

        <Switch>
          <Route path="/login/success" render={props => {
            let search = props.location.search;
            if (!search) return;
            const queryParams = querystring.parse(search.substr(1));
            const sessionId = queryParams.key;
            if (sessionId) window.sessionStorage.setItem("sessionId", sessionId);
            props.history.push('/');
          }} />

          <Route exact path="/">
            <Home />
          </Route>

          <Route exact path="/qr" component={QR} />

          <Route exact path="/logout" render={props => {
            window.sessionStorage.removeItem('sessionId');
            props.history.push('/api/logout');
          }} />

          <Route
            path="/societies/:category"
            component={Societies}
          />
          <Route
            path="/societies/id/:id"
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
