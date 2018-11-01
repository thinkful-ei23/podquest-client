import React from 'react';
import { connect } from 'react-redux';
import requiresLogin from './requires-login';
import SearchForm from './searchForm';
import { fetchProtectedData } from '../actions/protected-data';
import { getPodcasts } from '../actions/search';
import SearchResults from './searchResults';
import './dashboard.css';

export class Dashboard extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedOption: null,
			offset: 1
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

	handlePrev(e) {
		// dispatch the same GET from iTunes or a new action?
		// requires the original input query + attr (if attr exists)
		// current offset + 1, current offset starts at 2
		console.log('Prev button clicked');
		const input = e.target.value;
		this.setState(
			{
				offset: this.state.offset - 10
			},
			() => {
				this.state.selectedOption
					? this.props.dispatch(
						getPodcasts(input, this.state.selectedOption, this.state.offset)
					)
					: this.props.dispatch(getPodcasts(input, '', this.state.offset));
			}
		);
		// console.log('Prev', this.state.offset);
		// this.state.selectedOption
		// 	? this.props.dispatch(
		// 			getPodcasts(input, this.state.selectedOption, this.state.offset)
		// 	  )
		// 	: this.props.dispatch(getPodcasts(input, '', this.state.offset));
	}

	handleNext(e) {
		// dispatch the same GET from iTunes or a new action?
		// requires the original input query + attr (if attr exists)
		// current offset + 1, current offset starts at 2
		console.log('Next button clicked');
		const input = e.target.value;
		this.setState(
			{
				offset: this.state.offset + 10
			},
			() => {
				// console.log('Next', this.state.offset);
				this.state.selectedOption
					? this.props.dispatch(
						getPodcasts(input, this.state.selectedOption, this.state.offset)
					)
					: this.props.dispatch(getPodcasts(input, '', this.state.offset));
			}
		);
	}

	onSubmit(e) {
		// console.log(e);
		this.setState({
			searchInput: e
		});
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
			<div className="dashboard box">
				<div className="dashboard-username">
					<p className="user-welcome">Glad to have you with us,&nbsp;{this.props.username}!</p>
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
							resultNumber={index + 1}
							podcast={this.props.podcasts[index]}
						/>
					))
					: ''}
				{this.state.offset > 10 ? (
					<button className="btn btn-small btn-yellow2 btn-pre"
						onClick={e => this.handlePrev(e)}
						value={this.props.initialInput}
					>
						Show Previous Results
					</button>
				) : null}
				{this.props.podcasts ? (
					<button className="btn btn-small btn-yellow2 btn-results"
						onClick={e => this.handleNext(e)}
						value={this.props.initialInput}
					>
						Show More Results
					</button>
				) : (
						<p className="search-tagline">	'Nothing to see for now. So...shall we search for a podcast?'</p>
					)}
			</div>
		);
	}
}

const mapStateToProps = state => {
	const { currentUser } = state.auth;
	// console.log(state.search.initialInput);
	return {
		username: state.auth.currentUser.username,
		name: `${currentUser.name} `,
		protectedData: state.protectedData.data,
		podcasts: state.search.podcasts,
		initialInput: state.search.initialInput
	};
};

export default requiresLogin()(connect(mapStateToProps)(Dashboard));
