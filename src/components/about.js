import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

export class About extends React.Component {
	render() {
		if (this.props.loggedIn) {
			return (
				<div className="go-to-dashboard">
					<h1>Nananana~~ Podcast!</h1>
					<p>You know what we do. Let's keep searching, shall we?</p>
					<p>
						Take me back to <Link to="/dashboard">My Dashboard</Link>
					</p>
				</div>
			);
		}
		return (
			<div className="about-app">
				<h1>Nananana~~ Podcast!</h1>
				<h2>Are you on a quest to find that specific podcast episode?</h2>
				<p>
					Look no further! Well, actually, you'll need to look a little further.
					But, we're here to help!
				</p>

				<p>
					To start searching, please
					<Link to="/register">Register</Link>.
				</p>
				<p>
					If you've already got an account
					<Link to="/login">Login</Link>
				</p>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(About);
