import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  Link
} from "react-router-dom";

class RegisterForm extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      email: "",
      name: ""
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
              <form
                onSubmit={e => this.props.handleRegisterSubmit(e, this.state)}
              >
                Please register your account!
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
                <input
                  type="email"
                  name="email"
                  placeholder="email"
                  value={this.state.email}
                  onChange={this.handleChange}
                  className="auth-input"
                />
                <input
                  type="text"
                  name="name"
                  placeholder="name"
                  value={this.state.name}
                  onChange={this.handleChange}
                  className="auth-input"
                />
                <input
                  type="submit"
                  value="Register!"
                  className="auth-submit"
                />
              </form>
            </div>
          </div>
        </div>
        <Link to="/login" />
      </div>
    );
  }
}

export default RegisterForm;
