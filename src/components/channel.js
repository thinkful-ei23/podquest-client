import React from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';
import requiresLogin from './requires-login';
import MediaPlayer from './media-player';
import { getChannel } from '../actions/search';
import { setEpisode, clearEpisode } from '../actions/media-player'

class Channel extends React.Component{

    componentDidMount(){
        const channelUrl = localStorage.getItem('podcastChannel');
        // console.log('channelUrl', channelUrl);
        this.props.dispatch(getChannel(channelUrl))
    }

    componentWillUnmount() {
        this.props.dispatch(clearEpisode())
    }

    handleSelectEpisode(e) {
        const episodeTitle = e.target.value.trim();
        let episodeData = {};
        this.props.podcast.episodes.forEach(episode => {
            if (episode.title[0].trim() === episodeTitle) {
                // console.log(episode);
                if (episode.title) {
                    episodeData.episodeTitle = episode.title[0];
                }
                if (episode['itunes:season']) {
                    episodeData.episodeSeason = episode['itunes:season'][0];
                }
                if (episode['itunes:episode']) {
                    episodeData.episodeNumber = episode['itunes:episode'][0];
                }
                if (episode.pubDate) {
                    episodeData.episodeDate = episode.pubDate[0];
                }
                if (episode.enclosure) {
                    episodeData.episodeUrl = episode.enclosure[0].$.url;
                }
                if (episode.guid) {
                    episodeData.episodeGuid = episode.guid[0]._;
                }
                if (this.props.podcast.feedUrl) {
                    episodeData.feedUrl = this.props.podcast.feedUrl;
                }
            }
        })
        if (episodeData) {
            this.props.dispatch(setEpisode(episodeData));
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
                <Link to="/dashboard"><button>Back</button></Link>
                <h1>{podcast.title}</h1>
                <img src={podcast.image} alt="podcast wallpaper" height={200}/>
                <p dangerouslySetInnerHTML={{__html: podcast.description}}></p>
                <button>Subscribe to channel</button>
                <select
                    id='episode-select'
                    defaultValue="Select episode" 
                    onChange={(e) => this.handleSelectEpisode(e)}>
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