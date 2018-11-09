import React from 'react';
import SearchResults from './searchResults';
import pages from './makePages';
import './showResults.css';

export default class ShowResults extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			page: 0
		};
	}

	handleMore(e) {
		this.setState({
			page: this.state.page + 1
		});
	}

	handleLess(e) {
		this.setState({
			page: this.state.page - 1
		});
	}

	handleReset() {
		this.setState({
			page: 0
		});
	}

	render() {
		let searchResults = null;
		if (this.props.podcasts) {
			searchResults = pages(this.props.podcasts);
			// console.log(searchResults.length);
		}

		return (
			<section className="results-page">
				{searchResults
					? [...Array(searchResults[this.state.page].length).keys()].map(
						index => (
							<SearchResults
								key={searchResults[this.state.page][index].xml}
								resultNumber={index + 1}
								podcast={searchResults[this.state.page][index]}
							/>
						)
					)
					: 'Nothing to see for now. So...shall we search for a podcast?'}
				<div className="btn-row-results">
					{searchResults && this.state.page > 0 ? (
						<button
							className="btn btn-large btn-yellow2 btn-previous"
							onClick={e => this.handleLess(e)}
						>
							Previous Results
						</button>
					) : (
							''
						)}
					{searchResults && this.state.page < searchResults.length - 1 ? (
						<button
							className="btn btn-large btn-yellow2 btn-more"
							onClick={e => this.handleMore(e)}
						>
							Show More Results
						</button>
					) : (
							''
						)}
				</div>
			</section>
		);
	}
}