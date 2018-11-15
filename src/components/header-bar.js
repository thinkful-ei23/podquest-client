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

		return (
			<header className="header">
				<div className="header-bar">
					<h1 id="header-title">
						<NavLink to="/" className="head-link">
							podQuest
						</NavLink>
					</h1>
					<h2 className="header-sub-title">
						Bringing&nbsp;you&nbsp;the&nbsp;world, one&nbsp;pod&nbsp;cast&nbsp;at&nbsp;a&nbsp;time
					</h2>
				</div>
			</header>
		);
	}
}

const mapStateToProps = state => ({
	loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(HeaderBar);
