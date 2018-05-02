import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import LoginForm from "./LoginForm";

class Nav extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <Router>
        <div className="NavBar">
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
          <Link to="/dash">Profile</Link>
          <div className="nav-images">
            <div className="spacer">
              <a href="http://localhost:3000">
                <img
                  src={require("../svg/search-01.svg")}
                  className="nav-img"
                />
              </a>
            </div>
            <div className="spacer">
              {" "}
              <img
                src={require("../svg/heart-01.svg")}
                className="nav-img"
              />{" "}
            </div>
            <div className="spacer">
              {" "}
              <img
                src={require("../svg/add-01.svg")}
                className="nav-img"
              />{" "}
            </div>
            <div className="spacer">
              {" "}
              <img
                src={require("../svg/profile-01.svg")}
                className="nav-img"
              />{" "}
            </div>
          </div>
        </div>
      </Router>
    );
  }
}

export default Nav;
