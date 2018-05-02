import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  Link
} from "react-router-dom";
import Nav from "./components/Nav";
import Main from "./components/Main";
import DrinkList from "./components/DrinkList";
import DrinkSingle from "./components/DrinkSingle";
import Auth from "./modules/Auth";
import RegisterForm from "./components/RegisterForm";
import LoginForm from "./components/LoginForm";

import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      auth: Auth.isUserAuthenticated(),
      shouldGoToDash: false
    };

    this.handleRegisterSubmit = this.handleRegisterSubmit.bind(this);
    this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
  }
  handleRegisterSubmit(e, data) {
    e.preventDefault();
    fetch("/users", {
      method: "POST",
      body: JSON.stringify({
        user: data
      }),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(res => {
        console.log(res);
        Auth.authenticateToken(res.token);
        this.setState({
          auth: Auth.isUserAuthenticated(),
          shouldGoToDash: true
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  handleLoginSubmit(e, data) {
    e.preventDefault();
    fetch("/login", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(res => {
        Auth.authenticateToken(res.token);
        this.setState({
          auth: Auth.isUserAuthenticated(),
          shouldGoToDash: true
        });
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <Router>
        <div className="wrapper">
          <Nav className="NavBar" component={Nav} />
          <Route exact path="/drinks" exact component={DrinkList} />

          <Route path="/drinks/single/:id" exact component={DrinkSingle} />
          <Route
            exact
            path="/register"
            render={() => (
              <RegisterForm handleRegisterSubmit={this.handleRegisterSubmit} />
            )}
          />

          <Route
            exact
            path="/login"
            render={() => !this.state.auth ? (<Redirect to="/dash"/>) :
            (<LoginForm handleLoginSubmit={this.handleLoginSubmit} />)
            }
          />

          {this.state.shouldGoToDash ? <Redirect to="/dash" /> : ""}
        </div>
      </Router>
    );
  }
}

export default App;
