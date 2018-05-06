import { Router, Switch, Route, Link } from "react-router-dom";
import React, { Component } from "react";
import Auth from "../modules/Auth";

class Favorite extends Component {
  constructor() {
    super();
    this.state = {
      favoriteList: null,
      favoriteListLoaded: false
    };

    this.renderFavorites = this.renderFavorites.bind(this);
    this.deleteFavorite = this.deleteFavorite.bind(this);
    this.getFetch = this.getFetch.bind(this);
  }

  componentDidMount() {
    this.getFetch();
  }

  componentWillUnmount() {
    this.setState({
      favoriteListLoaded: false
    });
  }

  getFetch() {
    fetch("/favorites", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${Auth.getToken()}`,
        token: `${Auth.getToken()}`
      }
    })
      .then(res => res.json())
      .then(res => {
        console.log(res);
        this.setState({
          favoriteList: res.favorites,
          favoriteListLoaded: true
        });
      })
      .catch(err => console.log(err));
  }

  deleteFavorite(favorites_id) {
    console.log(favorites_id);
    fetch(`/favorites/${favorites_id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${Auth.getToken()}`,
        token: `${Auth.getToken()}`
      }
    }).then(res => this.getFetch());
  }

  renderFavorites() {
    console.log(this.state.favoriteList);
    return this.state.favoriteList.map(favorite => (
      <div>
        <Link className="no" to={`/drinks/single/${favorite.drink_id}`}>
          <div
            style={{ backgroundImage: "url(" + favorite.url + ")" }}
            className="drink-list"
          >
            <div className="text-rapper">
              <div className="drink-name">{favorite.name}</div>
            </div>
          </div>
        </Link>
        <div className="button">
          <button
            onClick={e => {
              this.deleteFavorite(favorite.id);
              console.log(favorite.id);
            }}
          >
            {" "}
            Delete
          </button>
        </div>
      </div>
    ));
  }

  render() {
    return (
      <div className="container">
        {this.state.favoriteListLoaded ? (
          this.renderFavorites()
        ) : (
          <p>Loading...</p>
        )}
        <div>
          <Link to={"/drinks/favorites"}> </Link>
        </div>
      </div>
    );
  }
}

export default Favorite;
