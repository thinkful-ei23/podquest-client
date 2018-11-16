import React from 'react';
import { connect } from 'react-redux';
import MediaQuery from 'react-responsive';
import { clearAuth } from '../actions/auth';
import { clearAuthToken } from '../local-storage';
import { NavLink, withRouter } from 'react-router-dom';
import './nav-bar.css';

export class NavBar extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			userName: '',
			showNavMenu: false
		};
	}
	componentDidMount() {
		document.body.addEventListener('click', e => {
			if (e.target.id !== "menu-icon") {
				this.handleHideMenu();
			}
		});
	}
	componentWillUnmount() {
		document.body.removeEventListener('click', e => {
			if (e.target.id !== "menu-icon") {
				this.handleHideMenu();
			}
		});
	}
	handleToggleMenu() {
		this.setState({
			showNavMenu: !this.state.showNavMenu
		});
  }
  handleHideMenu() {
    this.setState({
			showNavMenu: false
		});
  }
	logOut() {
		this.setState({
			showNavMenu: false
		});
		this.props.dispatch(clearAuth());
		clearAuthToken();
	}
	render() {
		let links;
		if (this.props.loggedIn) {
			links = (
				<React.Fragment>
					<li className="nav-li" key="navlinks-0">
						<NavLink to="/favorites">
							<p>My Favorite Episodes!</p>
						</NavLink>
					</li>
					<li className="nav-li" key="navlinks-1">
						<NavLink to="/subscriptions">
							<p>Subscriptions</p>
						</NavLink>
					</li>
					<li className="nav-li" key="navlinks-2">
						<NavLink to="" onClick={() => this.logOut()}>
							<p>Log out</p>
						</NavLink>
					</li>
				</React.Fragment>
			);
		}
		let burgerMenu = '';
		if (this.state.showNavMenu) {
			burgerMenu = (
				<div
					aria-live="polite"
					aria-atomic="true"
					aria-relevant="additions"
				>
					<ul className="burger-menu">
						{links}
					</ul>
				</div>
			);
		}
		return (
			<nav className="nav-bar">
				<div className="dashboard-username">
					<p className="user-welcome">
						Welcome,&nbsp;
						{this.props.username}!
					</p>
				</div>
				<MediaQuery minWidth={600}>
					<ul className="nav-ul">
						{links}
					</ul>
				</MediaQuery>
				<MediaQuery maxWidth={599}>
					<div
						className={`menu-container nav-menu`}
					>
						<button
							aria-label="menu"
							label="menu"
							className="menu-icon fas fa-bars"
							id="menu-icon"
							onClick={() => this.handleToggleMenu()}
						></button>
						{burgerMenu}
					</div>
				</MediaQuery>
			</nav>
		);
	}
}

const mapStateToProps = state => ({
	username: state.auth.currentUser.username,
	loggedIn: state.auth.currentUser !== null
});

export default withRouter(connect(mapStateToProps)(NavBar));