import React from 'react';
import { connect } from 'react-redux';
import requiresLogin from './requires-login';

import {
	postSubscribe,
	unsubscribe,
	getSubscriptions
} from '../actions/subscribe';

class SubButton extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			buttonState: ''
		};
	}

	componentDidMount() {
		this.setState({
			buttonState: this.props.subs
		});
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
		console.log(this.state.buttonState);
		let button = (
			<button
				className="btn btn-large btn-blue btn-subscribe"
				onClick={e => this.handleSubscribe(e)}
			>
				Subscribe to this Channel
			</button>
		);
		this.props.subs.forEach(sub => {
			if (sub.title === this.props.podcast.title) {
				button = (
					<button
						className="btn btn-large btn-blue btn-subscribe"
						onClick={e => this.handleUnsubscribe(e)}
					>
						Unsubscribe to this Channel
					</button>
				);
			}
		});

		return <div className="sub-button">{button}</div>;
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

export default requiresLogin()(connect(mapStateToProps)(SubButton));
