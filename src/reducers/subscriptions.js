import React from 'react';
import { connect } from 'react-redux';
import requiresLogin from './requires-login';
import BackButton from './back-button'
import { getSubscriptions,unsubscribe } from '../actions/subscribe';
import { Link } from 'react-router-dom';
import './subscriptions.css';

export class Subscriptions extends React.Component {
	componentWillMount() {
		// console.log(this.props);
		this.props.dispatch(getSubscriptions());
		// let currDate = new Date();
	}

	render() {
		// console.log('props', this.props);
		let allSubs = null;
		if (this.props.subs) {
			if (this.props.subs.length < 1) {
				allSubs =
					<div>
						<p>You have no subscriptions...yet!</p>
					</div>
			} else {
				allSubs = this.props.subs.map(sub => (
					<li className="each-sub" key={sub.title}>
						<section className="subTitle">
							<Link
								onClick={() => localStorage.setItem('podcastChannel', sub.xml)}
								to={{
									pathname: `/channel`
								}}
							>
								<p>{sub.title}</p>
							</Link>
						</section>

						<button className='btn-unsub' onClick ={()=> this.props.dispatch(unsubscribe(sub.title))}>
							Unsubscribe
						</button>
					</li>
					
				));
			}

		}

		return (
			<div className="subscriptions-page box">
				<BackButton />
				<h6>Your Subscriptions</h6>
				<ul className="all-subscriptions">
					{allSubs ? allSubs : ''}
				</ul>
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
