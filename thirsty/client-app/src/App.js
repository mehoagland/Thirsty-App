import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Nav from './components/Nav';
import Main from './components/Main';
import "./App.css";


class App extends Component {
  render() {
    return (
      <Router>
        <div className= 'wrapper'>
          <Nav component={Nav}/>
          <Route path="/" exact component={Main}  />

        </div>
      </Router>
    );
  }
}

export default App;
