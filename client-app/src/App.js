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
import Favorite from "./components/Favorite";
import Dashboard from "./components/Dashboard";

import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      auth: Auth.isUserAuthenticated(),
      shouldGoToDash: false,
      shouldGoToLogin: false
    };

    this.handleRegisterSubmit = this.handleRegisterSubmit.bind(this);
    this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout() {
    fetch("/logout", {
      method: "DELETE",
      headers: {
        token: Auth.getToken(),
        Authorization: `Token ${Auth.getToken()}`
      }
    })
      .then(res => {
        Auth.deauthenticateUser();
        this.setState({
          auth: Auth.isUserAuthenticated(),
          shouldGoToLogin: true
        });
      })
      .catch(err => console.log(err));
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
        console.log(Auth.authenticateToken(res.token));
        this.setState({
          auth: Auth.isUserAuthenticated(),
          shouldGoToDash: true
        });
        alert("Registered successfully");
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
        <div className="yes">
          <Nav
            className="NavBar"
            component={Nav}
            handleLogout={this.handleLogout}
          />

          <Route exact path="/drinks" exact component={DrinkList} />

          <Route path="/drinks/single/:id" exact component={DrinkSingle} />
          <Route
            exact
            path="/register"
            render={() =>
              this.state.auth ? (
                <Redirect to="/login" />
              ) : (
                <RegisterForm
                  handleRegisterSubmit={this.handleRegisterSubmit}
                />
              )
            }
          />

          <Route
            exact
            path="/login"
            render={() =>
              this.state.auth ? (
                <Redirect to="/drinks/dash" />
              ) : (
                <LoginForm handleLoginSubmit={this.handleLoginSubmit} />
              )
            }
          />

          {this.state.shouldGoToDash ? <Redirect to="/drinks/dash" /> : ""}

          <Route exact path="/drinks/favorites" exact component={Favorite} />

          <Route exact path="/drinks/dash" exact component={Dashboard} />
        </div>
      </Router>
    );
  }
}

export default App;
