import React from 'react';
import { connect } from 'react-redux';
import { clearAuth } from '../actions/auth';
import { clearAuthToken } from '../local-storage';
import { NavLink } from 'react-router-dom';
import './header-bar.css';

export class HeaderBar extends React.Component {
	logOut() {
		this.props.dispatch(clearAuth());
		clearAuthToken();
	}

	render() {
		// Only render the log out button if we are logged in
		let logOutButton;
		if (this.props.loggedIn) {
			logOutButton = <button className="btn btn-med btn-green btn-logout" onClick={() => this.logOut()}>Log out</button>;
		}
		return (
			<header className="header">
				<div className="header-bar">
					<h1 id="header-title">
						<NavLink to="/" className="head-link" >podQuest</NavLink>
					</h1>
					<h2 className="header-sub-title">Bringing you the world, one pod cast at a time</h2>
					{logOutButton}
					<NavLink to="/favorites" className="fav-link">Favorite Episodes!</NavLink>
				</div>
			</header>
		);
	}
}

const mapStateToProps = state => ({
	loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(HeaderBar);
