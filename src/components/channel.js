import React from 'react';
import { connect } from 'react-redux';
import { NavLink, Redirect } from 'react-router-dom';
import requiresLogin from './requires-login';
import MediaPlayer from './media-player';
import Spinner from './spinner';
import { getChannel } from '../actions/search';
import { setEpisode, clearEpisode } from '../actions/media-player';
import { postSubscribe } from '../actions/subscribe';

import './channel.css';

export class Channel extends React.Component{

	componentDidMount() {
		const channelUrl = localStorage.getItem('podcastChannel');
		// console.log('channelUrl', channelUrl);
		this.props.dispatch(getChannel(channelUrl));
	}

	componentWillUnmount() {
		this.props.dispatch(clearEpisode());
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
		});
		if (episodeData) {
			this.props.dispatch(setEpisode(episodeData));
		}
	}

	handleSubscribe(e) {
		let title = this.props.podcast.title;
		let feedUrl = this.props.podcast.feedUrl;
		// this.props.dispatch(subscribeChannel(title));
		this.props.dispatch(postSubscribe(title, feedUrl));
	}

	render() {
		let channel = '';
		if (!this.props.loggedIn) {
			channel = <Redirect to="/" />;
		}

		if (this.props.loading) {
			channel = (
				<React.Fragment>
					<Spinner />
				</React.Fragment>
			);
		}

		if (this.props.error) {
			channel = (
				<p>Error. {this.props.error.message}.</p>
			);
		}

		const podcast = this.props.podcast;
		if (podcast) {
			let optionEpisode = [];
			if (podcast.episodes) {
				// loops through episodes
				optionEpisode = podcast.episodes.map((episode, index) => {
					return <option key={index}>{episode.title}</option>;
				});
			}

			channel = (
				<React.Fragment>
					<h2 className="title-channel">{podcast.title}</h2>
					<img
						className="channel-pod-img"
						src={podcast.image}
						alt="podcast wallpaper"
						height={200}
					/>
					<p className="channel-desc" dangerouslySetInnerHTML={{ __html: podcast.description }} />
					<button
						className="btn btn-large btn-blue btn-subscribe"
						onClick={e => this.handleSubscribe(e)}
					>
						Subscribe to channel
					</button>
					<label htmlFor='episode-select'></label>
					{/* //TODO */}
					<select
						className="episode-select styled-select green rounded"
						id="episode-select"
						defaultValue="Select episode"
						onChange={e => this.handleSelectEpisode(e)}
					>
						<option>Select episode</option>
						{optionEpisode}
					</select>
					<MediaPlayer />
				</React.Fragment>
			);
		}
		return (
			<div className="channel-box box">
					<button className="btn btn-small btn-blue btn-back">
				<NavLink className="back-to-dash" to="/dashboard">
						<i className="fas fa-angle-left" />
						&nbsp;Back
				</NavLink>
					</button>
				{channel}
			</div>
		);
	}
}

const mapStateToProps = state => {
	// console.log('state', state); // to look at state
	return {
		podcast: state.search.currChannel,
		loggedIn: state.auth.currentUser !== null,
		error: state.search.error,
		loading: state.search.loading,
	};
};

export default requiresLogin()(connect(mapStateToProps)(Channel));
