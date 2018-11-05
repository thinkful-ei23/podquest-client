import React from 'react';
import { connect } from 'react-redux';
import ReactHowler from 'react-howler';
import raf from 'raf';
import { userFavoriteInfo, deleteFavorite, getFavorite } from "../actions/favorite";


export class MediaPlayer extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      playing: false,
      loaded: false,
      loop: false,
      mute: false,
      volume: 1.0
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

  componentDidMount () {
    this.props.dispatch(getFavorite());
  }

  componentDidUpdate (prevProps, prevState, prevContext) {
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

  componentWillUnmount () {
    this.clearRAF()
  }

  handleToggle () {
    this.setState({
      playing: !this.state.playing
    })
  }

  handleOnLoad () {
    this.setState({
      loaded: true,
      duration: this.player.duration()
    })
  }

  handleOnPlay () {
    this.setState({
      playing: true
    })
    this.renderSeekPos()
  }

  handleOnEnd () {
    this.setState({
      playing: false
    })
    this.clearRAF()
  }

  handleStop () {
    this.player.stop()
    this.setState({
      playing: false // Need to update our local state so we don't immediately invoke autoplay
    })
    this.renderSeekPos()
  }

  handleLoopToggle () {
    this.setState({
      loop: !this.state.loop
    })
  }

  handleMuteToggle () {
    this.setState({
      mute: !this.state.mute
    })
  }

  renderSeekPos () {
    if (this.state.loaded) {
      this.setState({
        seek: this.player.seek()
      });
    }
    if (this.state.playing) {
      this._raf = raf(this.renderSeekPos);
    }
  }

  clearRAF () {
    raf.cancel(this._raf)
  }

  seekTo (seek) {
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

  render () {
    let player;
    let season = '';
    let episode = '';
    let date = '';
    let favButton = (
      <button onClick={() => this.handleAddFav()}>
        Favorite
      </button>
    );
    if (this.props.favorites) {
      this.props.favorites.map(favorite => {
        if (favorite.title === this.props.episodeTitle) {
          favButton = (
            <button onClick={() => this.handleDeleteFav()}>
              Unfavorite
            </button>
          );
        }
      });
    }
    if (this.props.episodeSeason) {
      season = `Season ${this.props.episodeSeason}`;
    }
    if (this.props.episodeNumber) {
      episode = ` : Episode ${this.props.episodeNumber}`;
    }
    if (this.props.episodeSeason && this.props.episodeDate) {
      date += ` - `
    }
    if (this.props.episodeDate) {
      date += this.props.episodeDate;
    }
    if (this.props.episodeUrl && !this.state.loaded) {
      player = (
        <p>Loading...</p>
      )
    } else if (this.props.episodeUrl && this.state.loaded) {
      player = (
        <React.Fragment>
          <p><strong>{this.props.episodeTitle}</strong></p>
          <p>{season}{episode}<em>{date}</em></p>
          <div className='toggles'>
            <label>
              Loop:
              <input
                type='checkbox'
                checked={this.state.loop}
                onChange={this.handleLoopToggle}
              />
            </label>
            <label>
              Mute:
              <input
                type='checkbox'
                checked={this.state.mute}
                onChange={this.handleMuteToggle}
              />
            </label>
          </div>
  
          <div className='volume'>
            <label>
              Volume:
              <span className='slider-container'>
                <input
                  type='range'
                  min='0'
                  max='1'
                  step='.05'
                  value={this.state.volume}
                  onChange={e => this.setState({volume: parseFloat(e.target.value)})}
                  style={{verticalAlign: 'bottom'}}
                />
              </span>
              {(this.state.volume * 100).toFixed(0)}
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
              <p>
                {(this.state.seek) ? new Date(this.state.seek * 1000).toISOString().substr(11, 8) : '00:00:00'}
                {' / '}
                {(this.state.duration) ? new Date(this.state.duration * 1000).toISOString().substr(11, 8) : '00:00:00'}
              </p>
            </label>
          </div>
  
          <button className='play-button' onClick={this.handleToggle} disabled={!this.state.loaded}>
            {(this.state.playing) ? 'Pause' : 'Play'}
          </button>
          <button className='stop-button' onClick={this.handleStop} disabled={!this.state.loaded}>
            Stop
          </button>
          {favButton}
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
