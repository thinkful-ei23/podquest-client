import React from 'react';
import { Field, reduxForm, focus } from 'redux-form';
import { registerUser } from '../actions/users';
import { login } from '../actions/auth';
import Input from './input';
import { required, nonEmpty, matches, length, isTrimmed, email, username } from '../validators';
import './registration-form.css';
const passwordLength = length({ min: 10, max: 72 });
const matchesPassword = matches('password');


export class RegistrationForm extends React.Component {
    onSubmit(values) {
        const { email, password, username } = values;
        const user = { username, password, email };
        return this.props
            .dispatch(registerUser(user))
            .then(() => this.props.dispatch(login(username, password)));
    }

    render() {
        return (
            <form
                className="register-form"
                onSubmit={this.props.handleSubmit(values =>
                    this.onSubmit(values)
                )}>
                {/* <label className="input-label input-label-reg" htmlFor="email">Email</label> */}
                <Field
                    id="email"
                    label='Email'
                    component={Input}
                    type="text"
                    name="email"
                    validate={[email, required, nonEmpty]}
                />
                {/* <label className="input-label input-label-reg" htmlFor="username">Username</label> */}
                <Field
                    id="username"
                    label='Username'
                    component={Input}
                    type="text"
                    name="username"
                    validate={[required, nonEmpty, isTrimmed, username]}
                />
                {/* <label className="input-label input-label-reg" htmlFor="password">Password</label> */}
                <Field
                    id="password"
                    label='Password'
                    component={Input}
                    type="password"
                    name="password"
                    validate={[required, passwordLength, isTrimmed]}
                />
                {/* <label className="input-label input-label-reg" htmlFor="passwordConfirm">Confirm password</label> */}
                <Field
                    id="passwordConfirm"
                    label='Confirm password'
                    component={Input}
                    type="password"
                    name="passwordConfirm"
                    validate={[required, nonEmpty, matchesPassword]}
                />
                <button className="btn btn-large btn-green btn-form submit-button"
                    type="submit"
                    disabled={this.props.pristine || this.props.submitting}>
                    Register
                </button>
            </form>
        );
    }
}

export default reduxForm({
    form: 'registration',
    onSubmitFail: (errors, dispatch) =>
        dispatch(focus('registration', Object.keys(errors)[0]))
})(RegistrationForm);
