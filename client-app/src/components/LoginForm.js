import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  Link
} from "react-router-dom";

class LoginForm extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: ""
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    const name = e.target.name;
    const val = e.target.value;
    this.setState({
      [name]: val
    });
  }
  render() {
    return (
      <div>
        <div className="container3">
          <div className="content">
            <img
              src={require("../svg/thirsty-logo-01.svg")}
              className="thirsty"
            />
            <div className="auth-form">
              <form onSubmit={e => this.props.handleLoginSubmit(e, this.state)}>
                Login please...
                <input
                  type="text"
                  name="username"
                  placeholder="username"
                  value={this.state.username}
                  onChange={this.handleChange}
                  className="auth-input"
                />
                <input
                  type="password"
                  name="password"
                  placeholder="password"
                  value={this.state.password}
                  onChange={this.handleChange}
                  className="auth-input"
                />
                <input type="submit" value="Login!" className="auth-submit" />
              </form>
            </div>
          </div>
          <Link to="/drinks/dash" />
        </div>
      </div>
    );
  }
}

export default LoginForm;
