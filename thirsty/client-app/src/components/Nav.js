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
        <div className="Links">
          <Link to="/register">Register</Link> <Link to="/login">Login</Link>{" "}
          <button onClick={this.props.handleLogout}>Logout</button>
        </div>
        <div className="nav-images">
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
          <div className="spacer">
            {" "}
            <img src={require("../svg/add-01.svg")} className="nav-img" />{" "}
          </div>
          <div className="spacer">
            {" "}
            <Link to={"/drinks/dash"}>
              <img src={require("../svg/profile-01.svg")} className="nav-img" />{" "}
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Nav;
