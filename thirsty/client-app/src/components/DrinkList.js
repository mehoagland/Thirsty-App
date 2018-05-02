import React, { Component } from "react";
import api from "../api";
import DrinkSingle from "./DrinkSingle";
import { Router, Switch, Route, Link } from "react-router-dom";

class DrinkList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      apiDataLoaded: false,
      drinkData: null
    };
    this.renderDrinks = this.renderDrinks.bind(this);
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

  renderDrinks() {
    return this.state.drinkData.map(drink => (
      <div className="all-drinks">
        <div className="image">
          <img src={drink.strDrinkThumb} className="main-drinks" />
        </div>
        <Link to={`/drinks/single/${drink.idDrink}`} className="drink-name">
          {drink.strDrink}
        </Link>
      </div>
    ));
  }

  render() {
    return (
      <div className="wrapper">
        <div className="container">
          {this.state.apiDataLoaded ? this.renderDrinks() : <div>Loading</div>}
        </div>
      </div>
    );
  }
}

export default DrinkList;
