import React from 'react';
import { connect } from 'react-redux';
import requiresLogin from './requires-login';
import { getSubscriptions } from '../actions/subscribe';

export class Subscriptions extends React.Component {
	componentWillMount() {
		// console.log(this.props);
		this.props.dispatch(getSubscriptions());
	}

	render() {
		console.log('props', this.props);
		let subTitles = null;
		if (this.props.subs) {
			subTitles = this.props.subs.map(sub => sub.title);
			console.log(subTitles);
		}
		if (!this.props.subs) {
			return <div>You have no subscriptions...yet!</div>;
		}
		return (
			<div className="all-subscriptions">
				You are subscribed to:
				{subTitles ? subTitles.map(title => <div>{title}</div>) : ''}
			</div>
		);
	}
}

const mapStateToProps = state => {
	console.log('state', state); // to look at state
	return {
		// channel: state.subscribe.channels,
		subs: state.subscribe.subscriptions
	};
};

export default requiresLogin()(connect(mapStateToProps)(Subscriptions));
