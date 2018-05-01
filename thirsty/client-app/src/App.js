import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Nav from "./components/Nav";
import Main from "./components/Main";
import DrinkList from "./components/DrinkList";
import DrinkSingle from "./components/DrinkSingle";

import "./App.css";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="wrapper">
          <Nav className="NavBar" component={Nav} />
          <Route path="/" exact component={DrinkList} />
          <Route path="/single/:id" exact component={DrinkSingle} />
        </div>
      </Router>
    );
  }
}

export default App;
