import React from 'react';
import { connect } from 'react-redux';
import requiresLogin from './requires-login';
import SearchForm from './searchForm';
import { fetchProtectedData } from '../actions/protected-data';
import { getPodcasts } from '../actions/search';
import SearchResults from './searchResults';

export class Dashboard extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedOption: null,
		};
	}

	componentDidMount() {
		this.props.dispatch(fetchProtectedData());
	}

	handleOptionChange(e) {
		console.log(e.target.value);
		this.setState({
			selectedOption: e.target.value
		});
	}

	onSubmit(e) {
		// console.log(e);
		if (this.state.selectedOption) {
			// console.log('option is', this.state.selectedOption);
			this.props.dispatch(getPodcasts(e, this.state.selectedOption));
			// .then(() => this.SearchForm.reset());
		} else {
			this.props.dispatch(getPodcasts(e));
		}
	}

	render() {
		return (
			<div className="dashboard">
				<div className="dashboard-username">
					Username: {this.props.username}
				</div>
				<SearchForm
					handleOptionChange={e => this.handleOptionChange(e)}
					onSubmit={e => this.onSubmit(e)}
					selectedOption={this.state.selectedOption}
				/>

				{this.props.podcasts
					? [...Array(this.props.podcasts.length).keys()].map(index => (
							<SearchResults
								key={this.props.podcasts[index].id}
								resultNumber={index+1}
								podcast={this.props.podcasts[index]}
							/>
					))
					: ''}
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
