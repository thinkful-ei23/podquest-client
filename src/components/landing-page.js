import React from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';

import LoginForm from './login-form';
import Spinner from './spinner';
import './landing-page.css';

export function LandingPage(props) {
    // If we are logged in redirect straight to the user's dashboard
    if (props.loggedIn) {
        return <Redirect to="/dashboard" />;
    }

    let spinner = '';
    if (props.loading) {
        spinner = <Spinner />;
    }

    return (
        <div className="land-home box">
            <h2>Login</h2>
            <p>for your casting pleasure</p>

            <LoginForm />
            {spinner}
            <p className="link link-reg">Don't have an account? Click&nbsp;here&nbsp;to&nbsp;<Link to="/register">Register</Link></p>
        </div>
    );
}

const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser !== null,
    loading: state.auth.loading
});

export default connect(mapStateToProps)(LandingPage);
