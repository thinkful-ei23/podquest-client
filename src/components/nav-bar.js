import React from 'react';
import { connect } from 'react-redux';
import { clearAuth } from '../actions/auth';
import { clearAuthToken } from '../local-storage';
import { NavLink } from 'react-router-dom';
import './nav-bar.css';

export class NavBar extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			userName: ''
		};
	}
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
				<div className="dashboard-username">
					<p className="user-welcome">
						Welcome,&nbsp;
						{this.props.username}!
					</p>
				</div>
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
	username: state.auth.currentUser.username,
	loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(NavBar);