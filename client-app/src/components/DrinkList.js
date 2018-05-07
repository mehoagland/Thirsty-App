import React, { Component } from "react";
import api from "../api";
import DrinkSingle from "./DrinkSingle";
import { Router, Switch, Route, Link } from "react-router-dom";
import Search from "./Search";

class DrinkList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      apiDataLoaded: false,
      drinkData: null
    };
    this.renderDrinks = this.renderDrinks.bind(this);
    this.getSearchResults = this.getSearchResults.bind(this);
  }

  //   render() {
  // return (
  //   <div>
  //     {this.props.allPokemon.map(item => {
  //       return (
  //         <div>
  //           <h1 onClick={() => this.props.displayInfo(item.url) }>{item.name}</h1>
  //         </div>
  //       );
  //     })}

  componentDidMount() {
    fetch("https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Alcoholic")
      .then(response => response.json())
      .then(response => {
        this.setState({
          apiDataLoaded: true,
          drinkData: response.drinks
        });
      });
  }

  getSearchResults(e, search) {
    e.preventDefault();
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${search}`)
      .then(response => response.json())
      .then(response => {
        console.log("Line 25", response);
        this.setState({
          apiDataLoaded: true,
          drinkData: response.drinks
        });
      })
      .catch(err => console.log(err));
  }

  renderDrinks() {
    return this.state.drinkData.map(drink => (
      <div>
        <Link className="no" to={`/drinks/single/${drink.idDrink}`}>
          <div
            style={{ backgroundImage: "url(" + drink.strDrinkThumb + ")" }}
            className="drink-list"
          >
            <div className="text-rapper">
              <div className="drink-name">{drink.strDrink}</div>
            </div>
          </div>
        </Link>
      </div>
    ));
  }

  render() {
    return (
      <div className="container">
        <div className="search-component">
          <Search searchBar={Search} onSearch={this.getSearchResults} />
        </div>
        {this.state.apiDataLoaded ? this.renderDrinks() : <div>Loading</div>}
      </div>
    );
  }
}

export default DrinkList;
