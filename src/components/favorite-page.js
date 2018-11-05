import React from "react";
import requiresLogin from "./requires-login";
import { connect } from 'react-redux';
import { getFavorite } from "../actions/favorite";
import { getChannel } from "../actions/search";

export class FavoritePage extends React.Component {
  componentWillMount() {
    this.props.dispatch(getFavorite());
  }
  render(){
    console.log(this.props.favorites)
    if (!this.props.favorites) {
      return <div>Loading...</div>
    }
    const listFavorite = this.props.favorites.map((favorite, index) => {
      return <li key={index}>{favorite.title}</li>
    })

    return (
      <div>
        <ul>
          {listFavorite}
        </ul>
      </div>
    )
  }
}

const mapStateToProps = state => {
  // console.log('state', state); // to look at state
  return {
    favorites: state.favorites.favorites
  }
}

export default requiresLogin()(connect(mapStateToProps)(FavoritePage));