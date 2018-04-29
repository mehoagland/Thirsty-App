import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import DrinkList from './components/DrinkList';
import "./App.css";


class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route path="/" exact component={DrinkList} />

        </div>
      </Router>
    );
  }
}

export default App;
