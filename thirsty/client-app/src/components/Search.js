import React, { Component } from "react";
// import api from "../api";
import DrinkSingle from "./DrinkSingle";
import { Router, Switch, Route, Link } from "react-router-dom";

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      searchData: null,
      searchDataLoaded: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.getSearchResults = this.getSearchResults.bind(this);
  }

  ComponentDidMount() {
    this.getSearchResults();
  }

  getSearchResults(e, search) {
    e.preventDefault();
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${search}`)
      .then(response => response.json())
      .then(response => {
        console.log("Line 25", response);
        this.setState({
          searchDataLoaded: true,
          searchData: response.drinks
        });
      })
      .catch(err => console.log(err));
  }

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
          <form onSubmit={e => this.getSearchResults(e, this.state.search)}>
            <input
              className="searchBar"
              type="text"
              name="search"
              value={this.state.search}
              onChange={this.handleChange}
            />
            <input type="submit" value="Submit" />
          </form>
        </div>
        {this.state.searchDataLoaded ? (
          this.renderSearchDrinks()
        ) : (
          <div>Loading</div>
        )}
      </div>
    );
  }
}

export default Search;
