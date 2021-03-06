import React from 'react';
import { connect } from 'react-redux';
import ReactHowler from 'react-howler';
import raf from 'raf';
import Spinner from './spinner';
import { userFavoriteInfo, deleteFavorite, getFavorite } from '../actions/favorite';

import './media-player.css';

export class MediaPlayer extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      playing: false,
      loaded: false,
      loop: false,
      mute: false,
      volume: 0.5
    }
    this.handleToggle = this.handleToggle.bind(this)
    this.handleOnLoad = this.handleOnLoad.bind(this)
    this.handleOnEnd = this.handleOnEnd.bind(this)
    this.handleOnPlay = this.handleOnPlay.bind(this)
    this.handleStop = this.handleStop.bind(this)
    this.renderSeekPos = this.renderSeekPos.bind(this)
    this.handleLoopToggle = this.handleLoopToggle.bind(this)
    this.handleMuteToggle = this.handleMuteToggle.bind(this)
  }


  componentDidMount() {
    this.props.dispatch(getFavorite());
  }

  componentDidUpdate(prevProps, prevState, prevContext) {
    if (this.props.episodeUrl !== prevProps.episodeUrl) {

      this.setState({
        playing: false,
        loaded: false,
        mute: false,
        seek: null,
        duration: null
      });
      this.clearRAF();
    }
  }

  componentWillUnmount() {
    this.clearRAF();
  }

  handleToggle() {
    this.setState({
      playing: !this.state.playing
    })
  }

  handleOnLoad() {
    this.setState({
      loaded: true,
      duration: this.player.duration()
    })
  }

  handleOnPlay() {
    this.setState({
      playing: true
    })
    this.renderSeekPos()
  }

  handleOnEnd() {
    this.setState({
      playing: false
    })
    this.clearRAF()
  }

  handleStop() {
    this.player.stop()
    this.setState({
      playing: false // Need to update our local state so we don't immediately invoke autoplay
    })
    this.renderSeekPos()
  }

  handleLoopToggle() {
    this.setState({
      loop: !this.state.loop
    })
  }

  handleMuteToggle() {
    this.setState({
      mute: !this.state.mute
    })
  }

  renderSeekPos() {
    if (this.state.loaded) {
      this.setState({
        seek: this.player.seek()
      });
    }
    if (this.state.playing) {
      this._raf = raf(this.renderSeekPos);
    }
  }

  clearRAF() {
    raf.cancel(this._raf)
  }

  seekTo(seek) {
    this.player.seek(seek);
    this.setState({
      seek
    });
  }

  handleAddFav() {
    this.props.dispatch(userFavoriteInfo(this.props.feedUrl, this.props.episodeTitle, this.props.episodeUrl, this.props.episodeGuid));
    this.props.dispatch(getFavorite());
  }

  handleDeleteFav() {
    this.props.dispatch(deleteFavorite(this.props.episodeTitle));
    this.props.dispatch(getFavorite());
  }

  render() {
    let player;
    let episodeDate = '';
    let favButton = (
      <button className="btn-round btn-fav" title='favorite-button' onClick={() => this.handleAddFav()}>
        <i className="far fa-heart"></i>
        {/* Favorite */}
      </button>
    );
    if (this.props.favorites) {
      // const favorited =this.props.favorites.filter(favorite => favorite.title === this.props.episodeTitle)
      this.props.favorites.forEach(favorite => {
        if (favorite.title === this.props.episodeTitle) {
          favButton = (
            <button className="btn-round btn-fav" title='unFavorite-button' onClick={() => this.handleDeleteFav()}>
              <i className=" fas fa-heart"></i>
              {/* Remove, or Unfavorite */}
            </button>
          );
        }
      });
    }
    if (this.props.episodeDate) {
      const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
      episodeDate = new Date(this.props.episodeDate);
      const day = weekdays[episodeDate.getDay()];
      const date = episodeDate.getDate();
      const month = months[episodeDate.getMonth()];
      const year = episodeDate.getFullYear();
      episodeDate = (
        <p className="player-p">
          <em>{day}, {month} {date}, {year}</em>
        </p>
      );
    }
    let title = (
        <p className="player-p">
          <strong>{this.props.episodeTitle}</strong>
        </p>
      );
    if (this.props.noTitle) {
      title = '';
    }
    if (this.props.episodeUrl && !this.state.loaded) {
      player = <Spinner />;
    } else if (this.props.episodeUrl && this.state.loaded) {
      player = (
        <React.Fragment>
          {title}
          {episodeDate}
          <div className='toggles'>
            <label className="player-label">
              Loop:&nbsp;
              <input
                // type="radio"
                // id="radio-loop"
                // name="loop"
                className="checkbox"
                type='checkbox'
                checked={this.state.loop}
                onChange={this.handleLoopToggle}
              />

            </label>
            <label className="player-label">
              &nbsp;&nbsp;Mute:&nbsp;
              <input
                // type="radio"
                // id="radio-mute"
                // name="loop"
                className="checkbox"
                type='checkbox'
                checked={this.state.mute}
                onChange={this.handleMuteToggle}
              />

            </label>
          </div>

          <div className='volume'>
            <label className="player-label">
              Volume:&nbsp;
              <span className='slider-container'>
                <input
                  type='range'
                  min='0'
                  max='1'
                  step='.05'
                  value={this.state.volume}
                  onChange={e => this.setState({ volume: parseFloat(e.target.value) })}
                  style={{ verticalAlign: 'bottom' }}
                />
              </span>&nbsp;
              {(this.state.volume * 100).toFixed(0)}
              &nbsp;&nbsp;&nbsp;
            </label>
          </div>

          <div className='progress'>
            <label>
              <span className='slider-container'>
                <input
                  type='range'
                  min='0'
                  max={this.state.duration ? this.state.duration : 0}
                  step='1'
                  value={this.state.seek ? this.state.seek : 0}
                  onChange={e => this.seekTo(e.target.value)}
                />
              </span>
              <p className="player-p" >
                {(this.state.seek) ? new Date(this.state.seek * 1000).toISOString().substr(11, 8) : '00:00:00'}
                {' / '}
                {(this.state.duration) ? new Date(this.state.duration * 1000).toISOString().substr(11, 8) : '00:00:00'}
              </p>
            </label>
          </div>
          <div className="btn-row">
            <button className="btn-round" title='play' onClick={this.handleToggle} disabled={!this.state.loaded}>
              {/* <span className="play-btn-symbol"> {(this.state.playing) ? "\u23F8" : "\u25B6"} </span> */}
              <span className="play-btn-symbol"> {(this.state.playing) ? <i className="far fa-pause-circle"></i> : <i className="far fa-play-circle"></i>} </span>
            </button>
            <button className="btn-round" title='stop' onClick={this.handleStop} disabled={!this.state.loaded}>
              <i className="far fa-stop-circle"></i>
            </button>
            {favButton}

          </div>
        </React.Fragment>
      );
    }
    return (
      <section className="media-player">
        {!this.props.episodeUrl ? '' : (
          <ReactHowler
            src={this.props.episodeUrl}
            playing={this.state.playing}
            onLoad={this.handleOnLoad}
            onPlay={this.handleOnPlay}
            onEnd={this.handleOnEnd}
            loop={this.state.loop}
            mute={this.state.mute}
            volume={this.state.volume}
            ref={(ref) => (this.player = ref)}
            html5={true}
          />
        )}
        {player}
      </section>
    );
  }
}

const mapStateToProps = state => {
  let props = {};
  const episodeData = state.mediaPlayer.episodeData;
  if (episodeData) {
    props.episodeDate = episodeData.episodeDate;
    props.episodeGuid = episodeData.episodeGuid;
    props.episodeNumber = episodeData.episodeNumber;
    props.episodeSeason = episodeData.episodeSeason;
    props.episodeTitle = episodeData.episodeTitle;
    props.episodeUrl = episodeData.episodeUrl;
    props.feedUrl = episodeData.feedUrl;
  }
  if (state.favorites.favorites) {
    props.favorites = state.favorites.favorites;
  }
  return props;
};

export default connect(mapStateToProps)(MediaPlayer);
