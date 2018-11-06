import React from 'react';
import { connect } from 'react-redux';
import { clearAuth } from '../actions/auth';
import { clearAuthToken } from '../local-storage';
import { NavLink } from 'react-router-dom';
import './nav-bar.css';

export class NavBar extends React.Component {
	logOut() {
		this.props.dispatch(clearAuth());
		clearAuthToken();
	}
	render() {
		// Only render the log out button if we are logged in
		let logOutButton;
		let favoritesLink;
		let subscriptionLink;
		if (this.props.loggedIn) {
			logOutButton = (
				<button
					className="btn btn-med btn-white btn-logout"
					onClick={() => this.logOut()}
				>
					Log out
				</button>
			);
			favoritesLink = <NavLink className="btn btn-med btn-white btn-fav" to="/favorites">Favorite Episodes!</NavLink>;
			subscriptionLink = <NavLink className="btn btn-med btn-white btn-subscrip" to="/subscriptions">Subscriptions</NavLink>;
		}
		return (

			<nav className="nav-bar">

				{favoritesLink}
				{subscriptionLink}
				{logOutButton}
			</nav>

		);
	}
}

const mapStateToProps = state => ({
	loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(NavBar);