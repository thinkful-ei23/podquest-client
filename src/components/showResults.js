import React from 'react';
import ResultTable from './showTable';
import './showResults.css';

export default class ShowResults extends React.Component {
	render() {
		let searchResults = null;
		if (this.props.podcasts) {
			searchResults = this.props.podcasts;
			// console.log('podcasts', searchResults);
		}

		return (
			<section className="results-page">
				{searchResults ? (
					<ResultTable podcasts={searchResults} />
				) : (
					'You have no search results. So...care to search?'
				)}
			</section>
		);
	}
}
