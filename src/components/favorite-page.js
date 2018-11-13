import React from "react";
import requiresLogin from "./requires-login";
 
import { NavLink, Redirect } from 'react-router-dom';

import { connect } from 'react-redux';
import { getFavorite } from "../actions/favorite";
import MediaPlayer from "./media-player";
import { setEpisode } from "../actions/media-player";
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
      feedUrl: episode.feedUrl
    };
    if (episodeData) {
      this.props.dispatch(setEpisode(episodeData));
    }
  }


  render(){
    let listFavorite;
    if(!this.props.loggedIn){
			return <Redirect to='/'/>
		}
    if (!this.props.favorites) {
      return <div>Loading...</div>
    }

    if(this.props.favorites.length <1){
      listFavorite = 
        <div>
          <p>You have no favorite episodes.<br/> try adding a episode!</p>
        </div>
      
    }else{
      listFavorite = this.props.favorites.map((favorite, index) => {
        return (
          <li
            className="favorite-li"
            key={index}
            onClick={() =>
              this.handleSelectEpisode(favorite)
            }
          >
            {favorite.title}</li>
        )
      })
    }


    return (
      <div className="favorite-page box">
        <NavLink to="/dashboard"><button className="btn btn-small btn-blue btn-back">Back</button></NavLink>
        <ul className="favorite-ul">
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
		loggedIn: state.auth.currentUser !== null
  }
}

export default requiresLogin()(connect(mapStateToProps)(FavoritePage));