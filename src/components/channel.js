import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import requiresLogin from './requires-login';
import MediaPlayer from './media-player';
import Spinner from './spinner';
import BackButton from './back-button';
import { getChannel } from '../actions/search';
import { setEpisode, clearEpisode } from '../actions/media-player';

import {
	postSubscribe,
	unsubscribe,
	getSubscriptions
} from '../actions/subscribe';

import './channel.css';

export class Channel extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			displayImgPlaceholder: 'none'
		};
	}

	componentDidMount() {
		const channelUrl = localStorage.getItem('podcastChannel');
		// console.log('channelUrl', channelUrl);
		this.props.dispatch(getChannel(channelUrl));
		this.props.dispatch(getSubscriptions());
	}

	componentWillUnmount() {
		this.props.dispatch(clearEpisode());
	}

	handleSelectEpisode(e) {
		// Remove extra whitespace on ends and in middle of Title
		const episodeTitle = e.target.value.trim().replace(/\s+/g, ' ');
		let episodeData = {};
		this.props.podcast.episodes.forEach(episode => {
			if (episode.title[0].trim().replace(/\s+/g, ' ') === episodeTitle) {
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
		this.props.dispatch(postSubscribe(title, feedUrl));
	}

	handleUnsubscribe(e) {
		let title = this.props.podcast.title;
		this.props.dispatch(unsubscribe(title));
	}

	render() {
		let channel = '';
		let loading = '';
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

		if (this.props.subLoading) {
			loading = (
				<React.Fragment>
					<Spinner />
				</React.Fragment>
			);
		}

		if (this.props.error) {
			channel = <p>Error. {this.props.error.message}.</p>;
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

			let subButton = (
				<button
					className="btn btn-large btn-blue btn-subscribe"
					onClick={e => this.handleSubscribe(e)}
				>
					Subscribe to this Channel
				</button>
			);
			if (this.props.subLoading) {
				subButton = (
					<button
						className="btn btn-large btn-blue btn-subscribe"
						onClick={e => this.handleSubscribe(e)}
						disabled={true}
					>
						Subscribe to this Channel
					</button>
				);
			}
			if (this.props.subs) {
				this.props.subs.forEach(sub => {
					if (sub.title === this.props.podcast.title) {
						if (this.props.subLoading) {
							subButton = (
								<button
									className="btn btn-large btn-blue btn-subscribe"
									onClick={e => this.handleSubscribe(e)}
									disabled={true}
								>
									Unsubscribe to this Channel
								</button>
							);
						}
						subButton = (
							<button
								className="btn btn-large btn-blue btn-subscribe"
								onClick={e => this.handleUnsubscribe(e)}
							>
								Unsubscribe from this Channel
							</button>
						);
					}
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
						onError={e => {
							e.target.style.display = 'none';
							this.setState({ displayImgPlaceholder: 'inline' });
						}}
					/>
					<i
						style={{
							fontSize: '60px',
							textAlign: 'center',
							display: this.state.displayImgPlaceholder,
							color: 'gray'
						}}
						className="far fa-file-image"
					/>
					<p
						className="channel-desc"
						dangerouslySetInnerHTML={{ __html: podcast.description }}
					/>
					{subButton}
					{loading}
					<label htmlFor="episode-select" />
					<select
						aria-label={'episode - select'}
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
				<BackButton />
				{channel}
			</div>
		);
	}
}

const mapStateToProps = state => {
	// console.log('state', state); // to look at state
	return {
		subs: state.subscribe.subscriptions,
		podcast: state.search.currChannel,
		loggedIn: state.auth.currentUser !== null,
		error: state.search.error,
		loading: state.search.loading,
		subLoading: state.subscribe.loading
	};
};

export default requiresLogin()(connect(mapStateToProps)(Channel));
