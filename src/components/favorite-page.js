import React from "react";
import requiresLogin from "./requires-login";
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getFavorite, clickFavoriteSuccess } from "../actions/favorite";
import MediaPlayer from "./media-player";
import { setEpisode } from "../actions/media-player";

export class FavoritePage extends React.Component {
  componentWillMount() {
    this.props.dispatch(getFavorite());
  }
  handleSelectEpisode(episode) {
    let episodeData = {
      episodeTitle: episode.title,
      episodeUrl: episode.mediaUrl,
      feedUrl: episode.feedUrl
    };
    if (episodeData) {
      this.props.dispatch(setEpisode(episodeData));
    }
  }

  render(){
    if (!this.props.favorites) {
      return <div>Loading...</div>
    }
    const listFavorite = this.props.favorites.map((favorite, index) => {
      return (
        <li
          key={index}
          onClick = {() => 
            this.handleSelectEpisode(favorite)
          }
        >
        {favorite.title}</li>
      )
    })

    return (
      <div>
        <Link to="/dashboard"><button>Back</button></Link>
        <ul>
          {listFavorite}
        </ul>
        <MediaPlayer isFavorite={true}/>
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