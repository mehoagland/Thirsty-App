import React, { Component } from "react";
import api from "../api";

class DrinkList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      apiDataLoaded: false,
      drinkData: null
    };
    this.renderDrinks = this.renderDrinks.bind(this);
  }


  componentDidMount() {
    fetch('https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Alcoholic')
      .then(response => response.json())
        .then(response => {
          this.setState({
            apiDataLoaded: true,
            drinkData: response.drinks
          });
        })

    }

  renderDrinks() {
    return this.state.drinkData.map( drink =>
        <div>
          <h1>{drink.strDrink}</h1> <img src={drink.strDrinkThumb}/>
        </div>

  )}


  render() {
    return (
      <div>
      {this.state.apiDataLoaded ? ( this.renderDrinks()
    ) : (
      <div>Loading</div>
    )}
    </div>
  )}
}

export default DrinkList;
