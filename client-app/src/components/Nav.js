import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import LoginForm from "./LoginForm";
import Auth from "../modules/Auth";

class Nav extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="NavBar">
        <div className="links">
          <div className="register-link">
            <Link to="/register" style={{ textDecoration: "none" }}>
              Register
            </Link>
          </div>
          <div className="login-link">
            <Link to="/login" style={{ textDecoration: "none" }}>
              Login
            </Link>{" "}
          </div>
          <div className="logout-link">
            <button onClick={this.props.handleLogout}>Logout</button>
          </div>
        </div>

        <div className="spacer">
          <Link to={"/drinks/"}>
            <img src={require("../svg/search-01.svg")} className="nav-img" />
          </Link>
        </div>
        <div className="spacer">
          {" "}
          <Link to={"/drinks/favorites"}>
            <img src={require("../svg/heart-01.svg")} className="nav-img" />{" "}
          </Link>
        </div>
        <div> </div>
        <div className="spacer">
          {" "}
          <Link to={"/drinks/dash"}>
            <img src={require("../svg/profile-01.svg")} className="nav-img" />{" "}
          </Link>
        </div>
      </div>
    );
  }
}

export default Nav;
