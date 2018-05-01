import React, { Component } from "react";

class DrinkSingle extends Component {
  constructor(props) {
    super(props);

    this.state = {
      singleDrinkData: null,
      singleDrinkDataLoaded: false
    };
    this.specificKeyFilter = this.specificKeyFilter.bind(this);
  }

  componentDidMount() {
    this.displayInfo();
  }

  specificKeyFilter = (someObject, partial) => {
    const objectKeys = Object.keys(someObject);

    // Filter down the keys list to the keys that we care about.
    const keysWeWant = objectKeys.filter(key => {
      if (key.indexOf(partial) === 0) {
        if (someObject[key] === "") {
          return false;
        }
        return true;
      }

      return false;
    });

    // Loop over the keys we care about and make an array out of their values
    const array = keysWeWant.map(key => someObject[key]);
    return array;
  };

  displayInfo() {
    fetch(
      `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${
        this.props.match.params.id
      }`
    )
      .then(response => response.json())
      .then(response => {
        // console.log(response);
        this.setState({
          singleDrinkData: response.drinks[0],
          singleDrinkDataLoaded: true
        });
      })
      .catch(err => console.log(err));
  }

  render() {
    if (!this.state.singleDrinkDataLoaded) {
      return <div classeName="container">Loading</div>;
    }
    return (
      <div className="container">
        <p>{this.state.singleDrinkData.strDrink}</p>
        <img
          src={this.state.singleDrinkData.strDrinkThumb}
          className="singleDataImg"
        />
        Ingredients:<br />
        {this.specificKeyFilter(this.state.singleDrinkData, "strIngredient")}
      </div>
    );
  }
}

export default DrinkSingle;
