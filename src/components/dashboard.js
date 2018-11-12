import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import requiresLogin from './requires-login';
import SearchForm from './searchForm';
import Spinner from './spinner';
// import { fetchProtectedData } from '../actions/protected-data';
import { getPodcasts } from '../actions/search';
import ResultTable from './showTable';
import './dashboard.css';

export class Dashboard extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedOption: null,
			search: null
		};
	}

	// componentDidMount() {
	// 	this.props.dispatch(fetchProtectedData());
	// }

	handleOptionChange(e) {
		// console.log(e.target.value);
		this.setState({
			selectedOption: e.target.value
		});
	}

	handleInput(e) {
		// console.log(e.target.value);
		this.setState({
			search: e.target.value
		});
	}

	onSubmit(e) {
		if (this.state.selectedOption) {
			this.props.dispatch(getPodcasts(e, this.state.selectedOption));
		} else {
			this.props.dispatch(getPodcasts(e));
		}
	}

	render() {
		if (!this.props.loggedIn) {
			return <Redirect to="/" />;
		}

		let searchResults = null;
		if (this.props.podcasts) {
			searchResults = this.props.podcasts;
		}
		return (
			<div className="dashboard box">
				<SearchForm
					handleOptionChange={e => this.handleOptionChange(e)}
					onSubmit={e => this.onSubmit(e)}
					selectedOption={this.state.selectedOption}
					handleInput={e => this.handleInput(e)}
					search={this.state.search}
				/>
				<section className="results-page">
					{searchResults ? (
						<ResultTable podcasts={searchResults} />
					) : (
						''
					)}
				</section>
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
		podcasts: state.search.podcasts,
		loggedIn: state.auth.currentUser !== null,
		loading: state.search.loading
	};
};

export default requiresLogin()(connect(mapStateToProps)(Dashboard));
