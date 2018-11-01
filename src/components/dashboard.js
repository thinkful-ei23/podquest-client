import React from 'react';
import { connect } from 'react-redux';
import requiresLogin from './requires-login';
import SearchForm from './searchForm';
import { fetchProtectedData } from '../actions/protected-data';
import { getPodcasts } from '../actions/search';
import ShowResults from './showResults';

export class Dashboard extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedOption: null
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

	// handlePrev(e) {
	// 	// dispatch the same GET from iTunes or a new action?
	// 	// requires the original input query + attr (if attr exists)
	// 	// current offset + 1, current offset starts at 2
	// 	console.log('Prev button clicked');
	// 	const input = e.target.value;
	// 	this.setState(
	// 		{
	// 			offset: this.state.offset - 10
	// 		},
	// 		() => {
	// 			this.state.selectedOption
	// 				? this.props.dispatch(
	// 						getPodcasts(input, this.state.selectedOption, this.state.offset)
	// 				  )
	// 				: this.props.dispatch(getPodcasts(input, '', this.state.offset));
	// 		}
	// 	);
	// }

	// handleNext(e) {
	// 	// dispatch the same GET from iTunes or a new action?
	// 	// requires the original input query + attr (if attr exists)
	// 	// current offset + 1, current offset starts at 2
	// 	console.log('Next button clicked');
	// 	const input = e.target.value;
	// 	this.setState(
	// 		{
	// 			offset: this.state.offset + 10
	// 		},
	// 		() => {
	// 			// console.log('Next', this.state.offset);
	// 			this.state.selectedOption
	// 				? this.props.dispatch(
	// 						getPodcasts(input, this.state.selectedOption, this.state.offset)
	// 				  )
	// 				: this.props.dispatch(getPodcasts(input, '', this.state.offset));
	// 		}
	// );
	// }

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
				<ShowResults podcasts={this.props.podcasts} />
			</div>
		);
	}
}

const mapStateToProps = state => {
	const { currentUser } = state.auth;
	// console.log(state.search.podcasts);
	return {
		username: state.auth.currentUser.username,
		name: `${currentUser.name} `,
		protectedData: state.protectedData.data,
		podcasts: state.search.podcasts
	};
};

export default requiresLogin()(connect(mapStateToProps)(Dashboard));
