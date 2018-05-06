import React, { Component } from "react";
// import api from "../api";
import DrinkSingle from "./DrinkSingle";
import { Router, Switch, Route, Link } from "react-router-dom";

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: ""
    };
    this.handleChange = this.handleChange.bind(this);
  }

  // ComponentDidMount() {
  //   this.getSearchResults();
  // }

  handleChange(e) {
    const name = e.target.name;
    const val = e.target.value;
    this.setState({
      [name]: val
    });
  }

  renderSearchDrinks() {
    return this.state.searchData.map(drink => (
      <div className="all-drinks">
        <div className="image">
          <img src={drink.strDrinkThumb} className="main-drinks" />
        </div>
      </div>
    ));
  }

  render() {
    return (
      <div>
        <div className="search">
          <img
            src={require("../svg/search-black.svg")}
            className="search-img"
          />
          <form onSubmit={e => this.props.onSearch(e, this.state.search)}>
            <input
              className="searchBar"
              type="text"
              name="search"
              value={this.state.search}
              onChange={this.handleChange}
              placeholder="Search for a drink"
            />
            <input type="submit" value="Submit" />
          </form>
        </div>
      </div>
    );
  }
}

export default Search;
