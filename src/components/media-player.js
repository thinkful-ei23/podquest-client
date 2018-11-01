import React from 'react';
import { connect } from 'react-redux';
import ReactHowler from 'react-howler';
import raf from 'raf';

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

  render () {
    let player;
    if (this.props.episodeUrl) {
      player = (
        <React.Fragment>
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
          />
  
          <p>{(this.state.loaded) ? 'Loaded' : 'Loading'}</p>
  
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
  
          <button onClick={this.handleToggle} disabled={!this.state.loaded}>
            {(this.state.playing) ? 'Pause' : 'Play'}
          </button>
          <button onClick={this.handleStop} disabled={!this.state.loaded}>
            Stop
          </button>
        </React.Fragment>
      );
    }
    return (
      <section className="media-player">
        {player}
      </section>
    );
  }
}

const mapStateToProps = state => {
  return {
    episodeUrl: state.mediaPlayer.episodeUrl
  }
};

export default connect(mapStateToProps)(MediaPlayer);
