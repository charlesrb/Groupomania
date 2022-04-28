import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import Profile from "../../pages/Profile";
import Home from "../../pages/Home";

const index = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/profil" exact component={Profile} />
        <Redirect to="/" />
      </Switch>
    </Router>
  );
};

export default index;
