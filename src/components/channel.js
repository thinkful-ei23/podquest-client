import React from 'react';
import {connect} from 'react-redux';
import requiresLogin from './requires-login';
import MediaPlayer from './media-player';
import { getChannel } from '../actions/search';
import { setEpisode } from '../actions/media-player'

class Channel extends React.Component{

    componentDidMount(){
        const channelUrl = localStorage.getItem('podcastChannel');
        // console.log('channelUrl', channelUrl);
        this.props.dispatch(getChannel(channelUrl))
    }

    handleSelectEpisode(e) {
        const episodeTitle = e.target.value;
        let episodeUrl;
        this.props.podcast.episodes.forEach(episode => {
            if (episode.title[0] === episodeTitle) {
                episodeUrl = episode.enclosure[0].$.url;
            }
        })
        if (episodeUrl) {
            this.props.dispatch(setEpisode(episodeUrl));
        }
    }

    render(){

        if(!this.props.podcast) {
            return <div>Loading...</div>
        }
        // console.log('props', this.props); // see podcasts
        const podcast = this.props.podcast
        // loops through episodes
        let optionEpisode = [];
        if (podcast.episodes) {
            optionEpisode = podcast.episodes.map((episode, index) => {
                return <option key={index}>{episode.title}</option>
            });
        }
        return(
            <div>
                <h1>{podcast.title}</h1>
                <img src={podcast.image} alt="podcast wallpaper" height={200}/>
                <p>{podcast.description}</p>
                <button>Subscribe to channel</button>
                <select defaultValue="Select episode" onChange={(e) => this.handleSelectEpisode(e)}>
                    <option>Select episode</option>
                    {optionEpisode}
                </select>
                <MediaPlayer />
            </div>
        )
    }
}

const mapStateToProps = state => {
    // console.log('state', state); // to look at state
    return {
        podcast: state.search.currChannel
    }
}

export default requiresLogin()(connect(mapStateToProps)(Channel));