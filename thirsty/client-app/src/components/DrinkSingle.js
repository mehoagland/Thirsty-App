import React, { Component } from "react";
import Auth from "../modules/Auth";

class DrinkSingle extends Component {
  constructor(props) {
    super(props);

    this.state = {
      singleDrinkData: null,
      singleDrinkDataLoaded: false,
      auth: Auth.isUserAuthenticated(),
    };
    this.specificKeyFilter = this.specificKeyFilter.bind(this);
    this.addToFavorites = this.addToFavorites.bind(this);
  }

  componentDidMount() {
    this.displayInfo();
  }

  addToFavorites(){
      fetch("/favorites", {
        method: "POST",
        body: JSON.stringify({
          favorite: {
            drink_id: this.state.singleDrinkData.idDrink,
            name: this.state.singleDrinkData.strDrink,
            url: this.state.singleDrinkData.strDrinkThumb,
          }
        }),
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Token ${Auth.getToken()}`,
          token: `${Auth.getToken()}`,
        }
      })
        .then(res => res.json())
        .then(res => {
          console.log(res)
          Auth.authenticateToken(res.token);
          this.setState({
            auth: Auth.isUserAuthenticated(),


          });alert("added successfully")
        })
        .catch(err => console.log("FETCH ERROR: "+err));
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
    // ["Dark rum", "light rum"]
    let ingredients = this.specificKeyFilter(
      this.state.singleDrinkData,
      "strIngredient"
    );
    // ["1oz", "2oz"]
    let measures = this.specificKeyFilter(
      this.state.singleDrinkData,
      "strMeasure"
    );
    let ingredientsMatch = [];
    for (let i = 0; i < ingredients.length; i++) {
      if (measures[i] === undefined) {
        ingredientsMatch.push(<li>{ingredients[i]}</li>);
      } else {
        ingredientsMatch.push(
          <li> {measures[i] + " " + ingredients[i] + "\r"} </li>
        );
      }
    }
    console.log(ingredientsMatch);

    // `1oz Dark Rum
    // 2oz Light rum`

    return (
      <div className="container">
        <div className="name">
          <h1>{this.state.singleDrinkData.strDrink}</h1>
        </div>
        <img
          src={this.state.singleDrinkData.strDrinkThumb}
          className="singleDataImg"
        />

        <div className="ingredients">
          <h2> Ingredients: </h2>
          <p>{ingredientsMatch} </p>
        </div>

        <div className="directions">
          <h2>Directions:</h2>
          <p>{this.state.singleDrinkData.strInstructions}</p>
          <button onClick={()=> this.addToFavorites()}>
            ++++
          </button>
          <div className="whatDidYouThink">
            <b>What did you think?</b>
            <br />
            <input
              class="think"
              type="text"
              name="comment"
              placeholder="What did you do differently?"
            />
          </div>
        </div>
      </div>
    );
  }
}

export default DrinkSingle;
