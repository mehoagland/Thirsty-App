import React, { Component } from "react";
import api from "../api";
import DrinkSingle from './DrinkSingle';

class DrinkList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      apiDataLoaded: false,
      drinkData: null,
      singleDrinkData: null,
      singleDrinkDataLoaded: false
    };
    this.renderDrinks = this.renderDrinks.bind(this);
  }

  displayInfo(strDrink) {
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${strDrink}`)
      .then(response => response.json())
      .then(response => {
        console.log(response);
        this.setState({
          singleDrinkData: response.drinks,
          singleDrinkDataLoaded: true,
        });
      })
      .catch(err => console.log(err));
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

        <div className="all-drinks" >
          <div className='image'><img src={drink.strDrinkThumb} className='main-drinks'/></div> <div className='drink-name' onClick={() => this.displayInfo(drink.strDrink)}>{drink.strDrink}</div>
        </div>


  )}


  render() {
    return (
      <div className="wrapper">
        <div className = 'container'>
          {this.state.apiDataLoaded ? ( this.renderDrinks()

    ) : (
        <div>Loading</div>
    )}
    <DrinkSingle drinkSingle={this.state.singleDrinkData}
                  singleDataLoaded={this.state.singleDrinkDataLoaded}/>
    </div>
    </div>


  )}
}

export default DrinkList;
