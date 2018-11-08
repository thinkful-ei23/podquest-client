import React from 'react';
import { connect } from 'react-redux';
import { Route, withRouter,Switch } from 'react-router-dom';

import HeaderBar from './header-bar';
import NavBar from './nav-bar';
import LandingPage from './landing-page';
import About from './about';
import Dashboard from './dashboard';
import RegistrationPage from './registration-page';
import Channel from './channel';
import FavoritePage from './favorite-page';
import { refreshAuthToken } from '../actions/auth';
import './app.css';
import PageNotFound from './pageNotFound';

export class App extends React.Component {
	componentDidUpdate(prevProps) {
		if (!prevProps.loggedIn && this.props.loggedIn) {
			// When we are logged in, refresh the auth token periodically
			this.startPeriodicRefresh();
		} else if (prevProps.loggedIn && !this.props.loggedIn) {
			// Stop refreshing when we log out
			this.stopPeriodicRefresh();
		}
	}

	componentWillUnmount() {
		this.stopPeriodicRefresh();
	}

	startPeriodicRefresh() {
		this.refreshInterval = setInterval(
			() => this.props.dispatch(refreshAuthToken()),
			60 * 60 * 1000 // One hour
		);
	}

	stopPeriodicRefresh() {
		if (!this.refreshInterval) {
			return;
		}

		clearInterval(this.refreshInterval);
	}


	render() {

		let navBar;
		if(this.props.loggedIn){
			navBar = <NavBar/>
		}
		return (
			<div className="app">
				<HeaderBar />

				<main id="app-main-body">
					<Switch>
						<Route exact path="/" component={About} />
						<Route exact path="/login" component={LandingPage} />
						<Route exact path="/dashboard" component={Dashboard} />
						<Route exact path="/register" component={RegistrationPage} />
						<Route exact path="/channel/:id" component={Channel} />
						<Route exact path="/favorites" component={FavoritePage} />
						<Route component={PageNotFound}/>	
					</Switch>
					{navBar}
					
				</main>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	hasAuthToken: state.auth.authToken !== null,
	loggedIn: state.auth.currentUser !== null
});

// Deal with update blocking - https://reacttraining.com/react-router/web/guides/dealing-with-update-blocking
export default withRouter(connect(mapStateToProps)(App));
