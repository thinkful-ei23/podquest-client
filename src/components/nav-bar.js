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
					className="nav-logout"
					onClick={() => this.logOut()}
				>
					<p className="nav-logout-p">Log out</p>
				</button>

			);
			favoritesLink = <NavLink className="nav-fav" to="/favorites">My Favorite Episodes!</NavLink>;
			subscriptionLink = <NavLink className="nav-subscrip" to="/subscriptions">Subscriptions</NavLink>;
		}
		return (
			<nav className="nav-bar">
				<ul className="nav-ul">
					<li className="nav-li">	{favoritesLink}</li>
					<li className="nav-li">	{subscriptionLink}</li>
					<li className="nav-li nav-logout-li">	{logOutButton}</li>
				</ul>
			</nav>
		);
	}
}

const mapStateToProps = state => ({
	loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(NavBar);