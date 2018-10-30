import React from 'react';
import { connect } from 'react-redux';
import requiresLogin from './requires-login';
import SearchForm from './searchForm';
import { fetchProtectedData } from '../actions/protected-data';
import { getPodcasts } from '../actions/search';
import SearchResults from './searchResults';

export class Dashboard extends React.Component {
	componentDidMount() {
		this.props.dispatch(fetchProtectedData());
	}

	onSubmit(e) {
		this.props.dispatch(getPodcasts(e));
	}

	render() {
		return (
			<div className="dashboard">
				<div className="dashboard-username">
					Username: {this.props.username}
				</div>
				<SearchForm onSubmit={e => this.onSubmit(e)} />
				{(this.props.podcasts)?
					[...Array(this.props.podcasts.length).keys()].map((index) =>  
						<SearchResults key={this.props.podcasts[index].id} podcast={this.props.podcasts[index]}/>) :''}
				
			</div>
		);
	}
}

const mapStateToProps = state => {
	const { currentUser } = state.auth;
	return {
		username: state.auth.currentUser.username,
		name: `${currentUser.name} `,
		protectedData: state.protectedData.data,
		podcasts: state.search.podcasts
	};
};

export default requiresLogin()(connect(mapStateToProps)(Dashboard));
