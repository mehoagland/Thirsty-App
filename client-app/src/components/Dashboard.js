import React, { Component } from "react";

class Dashboard extends Component {
  constructor() {
    super();
  }
  render() {
    return (
      <div className="dash">
        <div className="message">
          Welcome to Thirsty ? Click on the search logo to look for a drink.
          This should show your account information....soon.
        </div>
      </div>
    );
  }
}
export default Dashboard;
