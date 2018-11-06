import React from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import RegistrationForm from './registration-form';
import './registration-page.css';


export function RegistrationPage(props) {
	// If we are logged in (which happens automatically when registration
	// is successful) redirect to the user's dashboard
	if (props.loggedIn) {
		return <Redirect to="/dashboard" />;
	}
	return (
		<div className="register-page box">
			<h2>Register for PodQuest</h2>
			<RegistrationForm />
			<p className="link link-reg-page">Already have an account?&nbsp;Click here to&nbsp;<Link to="/login">Login</Link></p>
		</div>
	);
}

const mapStateToProps = state => ({
	loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(RegistrationPage);
