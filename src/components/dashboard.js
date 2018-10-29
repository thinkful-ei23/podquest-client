import React from 'react';
import { connect } from 'react-redux';
import requiresLogin from './requires-login';
import SearchForm from './searchForm';
import { fetchProtectedData } from '../actions/protected-data';
import { getPodcasts } from '../actions/search';

export class Dashboard extends React.Component {
	componentDidMount() {
		this.props.dispatch(fetchProtectedData());
	}

	onSubmit(e) {
		console.log(e);
		this.props.dispatch(getPodcasts(e));
	}

	render() {
		return (
			<div className="dashboard">
				<div className="dashboard-username">
					Username: {this.props.username}
				</div>
				<SearchForm onSubmit={e => this.onSubmit(e)} />
			</div>
		);
	}
}

const mapStateToProps = state => {
	const { currentUser } = state.auth;
	return {
		username: state.auth.currentUser.username,
		name: `${currentUser.name} `,
		protectedData: state.protectedData.data
	};
};

export default requiresLogin()(connect(mapStateToProps)(Dashboard));
