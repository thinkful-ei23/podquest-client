import React from "react";
import requiresLogin from "./requires-login";
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getFavorite } from "../actions/favorite";
import { getChannel } from "../actions/search";

export class FavoritePage extends React.Component {
  componentWillMount() {
    this.props.dispatch(getFavorite());
  }
  render(){
    if (!this.props.favorites) {
      return <div>Loading...</div>
    }
    const listFavorite = this.props.favorites.map((favorite, index) => {
      return <li key={index}>{favorite.title}</li>
    })

    return (
      <div>
        <Link to="/dashboard"><button>Back</button></Link>
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