import React from 'react';
import {connect} from 'react-redux'
import { getChannel } from '../actions/search';

class Channel extends React.Component{
    

    componentDidMount(){
        const channelUrl = localStorage.getItem('podcastChannel');
        console.log('channelUrl', channelUrl);
        this.props.dispatch(getChannel(channelUrl))
    }

    render(){

        if(!this.props.podcast) {
            return <div>Loading...</div>
        }
        console.log('props', this.props); // see podcasts
        const podcast = this.props.podcast
        // loops through episodes
        const optionEpisode = podcast.episodes.map((episode, index) => {
            return <option key={index}>{episode.title}</option>
        })
        console.log(podcast.episodes[0].enclosure[0].$.url);
        return(
            <div>
                <h1>{podcast.title}</h1>
                <img src={podcast.image} alt="podcast wallpaper" height={200}/>
                <p>{podcast.description}</p>
                <button>Subscribe to channel</button>
                <select>
                    <option selected="defaultValue" >Select episode</option>
                    {optionEpisode}
                </select>
            </div>
        )
    }
}

const mapStateToProps = state => {
    console.log('state', state); // to look at state
    return {
        podcast: state.search.currChannel
    }
}

export default connect(mapStateToProps)(Channel)