import React from 'react';
import { NavLink,Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import './about.css';

export class About extends React.Component {
	render() {
		if (this.props.loggedIn) {
			return (
				// <div className="go-to-dashboard box">
				// 	<h2 className="go-to-h2">Nananana&nbsp;~~ &nbsp;Podcast!</h2>
				// 	<p className="go-to-p">You know what we do. Let's keep searching, shall we?</p>
				// 	<p className="go-to-p">
				// 		Take me back to &nbsp;<NavLink to="/dashboard">My Dashboard</NavLink>
				// 	</p>
				// </div>
				<Redirect to='/dashboard'/>
			);
		}
		return (
			<div className="about-app box">

				<h2>Are you on a <i id="world" className="fas fa-globe-americas"></i><span>quest</span> to find that specific podcast episode?</h2>
				<p>PodQuest will never give up and never surrender. With this app you will not have to worry about finding your podcasts through the ocean of other audio media out there as we do it for you! It is an app where you can find, listen, favorite, and even subscribe to your personal podcasts.</p>
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
