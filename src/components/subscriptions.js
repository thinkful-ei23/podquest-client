import React from 'react';
import { connect } from 'react-redux';
import requiresLogin from './requires-login';
import { getSubscriptions } from '../actions/subscribe';
import { Link, NavLink } from 'react-router-dom';
import './subscriptions.css';

export class Subscriptions extends React.Component {
	componentWillMount() {
		// console.log(this.props);
		this.props.dispatch(getSubscriptions());
		let currDate = new Date();
		console.log(currDate);
	}

	render() {
		// console.log('props', this.props);
		let allSubs = null;
		if (this.props.subs) {
			allSubs = this.props.subs.map(sub => (
				<div className="each-sub" key={sub.title}>
					<Link
						onClick={() => localStorage.setItem('podcastChannel', sub.xml)}
						to={{
							pathname: `/channel`
						}}
					>
						{sub.title}
					</Link>
				</div>
			));
		}
		// console.log(this.props.subs.xml);
		if (!this.props.subs) {
			return <div className="no-sub">You have no subscriptions...yet!</div>;
		}
		return (
			<div className="subscriptions-page box">
				<NavLink to="/dashboard">
					<button className="btn btn-small btn-blue btn-back">
						<i className="fas fa-angle-left" />
						&nbsp;Back
					</button>
				</NavLink>
				<div className="all-subscriptions">
					You are subscribed to:
					{allSubs ? allSubs : ''}
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => {
	// console.log('state', state); // to look at state
	return {
		subs: state.subscribe.subscriptions,
		subError: state.subscribe.error,
		loggedIn: state.auth.currentUser !== null
	};
};

export default requiresLogin()(connect(mapStateToProps)(Subscriptions));
