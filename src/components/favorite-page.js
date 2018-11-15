import React from "react";
import requiresLogin from "./requires-login";

import { Redirect } from 'react-router-dom';

import { connect } from 'react-redux';
import { getFavorite, deleteFavorite } from "../actions/favorite";
import MediaPlayer from "./media-player";
import BackButton from "./back-button";
import { setEpisode, clearEpisode } from "../actions/media-player";
import './favorite-page.css';

export class FavoritePage extends React.Component {
  componentWillMount() {
    this.props.dispatch(getFavorite());
  }

  handleSelectEpisode(episode) {
    let episodeData = {
      episodeTitle: episode.title,
      episodeUrl: episode.mediaUrl,
      episodeGuid: episode.guid,
    };
    if (episodeData) {
      this.props.dispatch(setEpisode(episodeData));
    }
  }

  render() {
    // Close media player if episode not in favorites
    if (this.props.playerEpisode) {
      let inFavorites = false;
      let favorites = this.props.favorites
      for (let i = 0; i < favorites.length; i++) {
        if (favorites[i].mediaUrl === this.props.playerEpisode.episodeUrl) {
          inFavorites = true;
          break;
        }
      }
      if (!inFavorites) {
        this.props.dispatch(clearEpisode());
      }
    }

    let listFavorite;
    if (!this.props.loggedIn) {
      return <Redirect to='/' />
    }

    if (!this.props.favorites) {
      return <div>Loading...</div>
    }

    if (this.props.favorites.length < 1) {
      listFavorite =
        <div>
          <p>You have no favorite episodes.<br /> try adding a episode!</p>
        </div>

    } else {
      listFavorite = this.props.favorites.map((favorite, index) => {
        return (
          <li className="each-fav" key={index}>
 
            <section className="favTitle"
              onClick={() =>
                this.handleSelectEpisode(favorite)
              }
            >
              <p>{favorite.title}</p>
            </section>

            <button className="btn-unfav" onClick ={()=> this.props.dispatch(deleteFavorite(favorite.title))}>
              Unfavorite
            </button>
          </li>
        )
      })
    }

    return (
      <div className="favorite-page box">
        <BackButton />
        <h6>Your Favorites</h6>
        <ul className="all-favorites">
          {listFavorite}
        </ul>
        <MediaPlayer />
      </div>
    )
  }
}

const mapStateToProps = state => {
  // console.log('state', state); // to look at state
  return {
    favorites: state.favorites.favorites,
    loggedIn: state.auth.currentUser !== null,
    playerEpisode: state.mediaPlayer.episodeData
  }
}

export default requiresLogin()(connect(mapStateToProps)(FavoritePage));