import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import './about.css';

export class About extends React.Component {
	render() {
		if (this.props.loggedIn) {
			return (
				<div className="go-to-dashboard">
					<h2>Nananana&nbsp;~~ &nbsp;Podcast!</h2>
					<p>You know what we do. Let's keep searching, shall we?</p>
					<p>
						Take me back to &nbsp;<Link to="/dashboard">My Dashboard</Link>
					</p>
				</div>
			);
		}
		return (
			<div className="about-app">

				<h2>Are you on a <i id="world" class="fas fa-globe-americas"></i>quest to find that specific podcast episode?</h2>
				<p>Blah &nbsp;&#126; &nbsp;blah&nbsp; ~~blah&nbsp;</p>
				<h3>Look no further!</h3>
				<p>(Well, actually, you'll need to look a little further.&nbsp;<i class="fas fa-search"></i><i class="far fa-smile-wink"></i><i class="fas fa-smile-wink"></i>)</p>
				<h4>But, we're here to help!&nbsp; &#33;</h4>


				<p>
					To start searching, go to&nbsp;
					<Link to="/register">Register</Link>.
				</p>
				<p>
					If you've already got an account, go to&nbsp;
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
