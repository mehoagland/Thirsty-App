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
        if (
          someObject[key] === "" ||
          someObject[key] === " " ||
          someObject[key] === null ||
          someObject[key] === "\r\n" ||
          someObject[key] === "\n"
        ) {
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
        <h1>{this.state.singleDrinkData.strDrink}</h1>
        <img
          src={this.state.singleDrinkData.strDrinkThumb}
          className="singleDataImg"
        />

        <div className="instructions">
          <div className="ingredients">
            <h2>Ingredients:</h2>

            {this.specificKeyFilter(
              this.state.singleDrinkData,
              "strIngredient"
            ).map(item => {
              return (
                <div>
                  <li>{item}</li>
                </div>
              );
            })}
          </div>
          <div className="measure">
            <h2>Measure:</h2>

            {this.specificKeyFilter(
              this.state.singleDrinkData,
              "strMeasure"
            ).map(item => {
              return (
                <div>
                  <li>{item}</li>
                </div>
              );
            })}
          </div>

          <div className="directions">
            <h2>Directions:</h2>
            <p>{this.state.singleDrinkData.strInstructions}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default DrinkSingle;
