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
    return this.state.favoriteList.map(favorite => {
      return (
        <div className="favs" key={favorite.id}>
          <img src={favorite.url} className="favListImg" />
          <Link to={`/drinks/single/${favorite.id}`}>{favorite.name}</Link>
          <button
            onClick={e => {
              this.deleteFavorite(favorite.id);
              console.log(favorite.id);
            }}
          >
            Delete
          </button>
        </div>
      );
    });
  }

  render() {
    return (
      <div className="wrapper">
        <div className="container">
          {this.state.favoriteListLoaded ? (
            this.renderFavorites()
          ) : (
            <p>Loading...</p>
          )}
          <div>
            hello
            <Link to={"/drinks/favorites"}> </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Favorite;
