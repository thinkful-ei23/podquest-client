import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

import './about.css';

export class About extends React.Component {
	render() {
		if (this.props.loggedIn) {
			return (
				<div className="go-to-dashboard box">
					<h2 className="go-to-h2">Nananana&nbsp;~~ &nbsp;Podcast!</h2>
					<p className="go-to-p">You know what we do. Let's keep searching, shall we?</p>
					<p className="go-to-p">
						Take me back to &nbsp;<NavLink to="/dashboard">My Dashboard</NavLink>
					</p>
				</div>
			);
		}
		return (
			<div className="about-app box">

				<h2>Are you on a <i id="world" className="fas fa-globe-americas"></i><span>quest</span> to find that specific podcast episode?</h2>
				<p>Blah &nbsp;&#126; &nbsp;blah&nbsp; ~~blah&nbsp;It's time to put on makeup. It's time to dress up right. It's time to
				raise the curtain on the Muppet Show tonight. Sunny Days sweepin' the clouds away. On my way to where the air is sweet. Can you tell me how to
				get how to get to Sesame Street.</p>
				<h3>Look no further!</h3>
				<p>Well, actually, you'll need to look a little further.&nbsp;<i className="far fa-smile-wink"></i></p>
				<h4>But, we're here to help!</h4>

				<section className="about-directions">

					<div className="about-reg">
						<p>	To start searching, go to</p>

						<NavLink className="link link-about" to="/register"><button className="btn btn-large btn-green btn-about"><span className="about-span">Register</span></button></NavLink>

					</div>

					<div className="about-log">
						<p>If you've already got an account, go to</p>
						<NavLink className="link link-about" to="/login"><button className="btn btn-large btn-blue btn-about"><span className="about-span">Login</span></button></NavLink>
					</div>

				</section>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(About);
