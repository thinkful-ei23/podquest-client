import React from 'react';
import SearchResults from './searchResults';
import pages from './makePages';

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
		if (this.state.pages > 0) {
			this.setState({
				page: this.state.page - 1
			});
		}
	}

	render() {
		let searchResults = null;
		if (this.props.podcasts) {
			searchResults = pages(this.props.podcasts);
			// console.log(searchResults.length);
		}
		return (
			<div>
				{searchResults
					? [...Array(searchResults[this.state.page].length).keys()].map(
							index => (
								<SearchResults
									key={searchResults[this.state.page][index].id}
									resultNumber={index + 1}
									podcast={searchResults[this.state.page][index]}
								/>
							)
					  )
					: 'Nothing to see for now. So...shall we search for a podcast?'}
				{searchResults && this.state.page > 0 ? (
					<button onClick={e => this.handleLess(e)}>Previous Results</button>
				) : (
					''
				)}
				{searchResults && this.state.page < searchResults.length - 1 ? (
					<button onClick={e => this.handleMore(e)}>Show More Results</button>
				) : (
					''
				)}
			</div>
		);
	}
}
