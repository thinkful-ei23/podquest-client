import React from 'react';
import { connect } from 'react-redux';
import MediaQuery from 'react-responsive';
import { clearAuth } from '../actions/auth';
import { clearAuthToken } from '../local-storage';
import { NavLink, withRouter } from 'react-router-dom';
import { BurgerMenu } from './burger-menu';
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
		// Only render the log out button if we are logged in
		// let logOutButton;
		// let favoritesLink;
		// let subscriptionLink;
		let links;
		if (this.props.loggedIn) {
			// logOutButton = (

			// 	<button
			// 		className="nav-logout"
			// 		onClick={() => this.logOut()}
			// 	>
			// 		<p className="nav-logout-p">Log out</p>
			// 	</button>

			// );
			// favoritesLink = <NavLink className="nav-fav" to="/favorites">My Favorite Episodes!</NavLink>;
			// subscriptionLink = <NavLink className="nav-subscrip" to="/subscriptions">Subscriptions</NavLink>;
			links = [
				{
					onClick: () => this.handleHideMenu(),
					text: 'My Favorite Episodes!',
					href: '/favorites',
					// classes: 'nav-fav',
					isLink: true
				},
				{
					onClick: () => this.handleHideMenu(),
					text: 'Subscriptions',
					href: '/subscriptions',
					// classes: 'nav-subscrip',
					isLink: true
				},
				{
					onClick: () => this.logOut(),
					text: 'Log out',
					href: '',
					// classes: 'nav-logout'
				}
			];
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
						{links.map((link, i) => {
							return (
								<li className={`nav-li ${link.classes}`} key={`navlinks-${i}`}>
									<NavLink to={link.href} onClick={() => link.onClick()}>
										{link.text}
									</NavLink>
								</li>
							);
						})}
						{/* <li className="nav-li">	{favoritesLink}</li>
						<li className="nav-li">	{subscriptionLink}</li>
						<li className="nav-li nav-logout-li">	{logOutButton}</li> */}
					</ul>
				</MediaQuery>
				<MediaQuery maxWidth={599}>
					<BurgerMenu
						classes="nav-menu"
						showMenu={this.state.showNavMenu}
						toggleMenu={() => this.handleToggleMenu()}
						links={links}
					/>
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