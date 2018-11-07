import React from 'react';
import ReactTable from 'react-table';
import { render } from 'react-dom';
import SearchResults from './searchResults';
import './showResults.css';

function SearchResults(props) {
	return (
			<div className="search-results">
					{props.resultNumber + ': \u00a0 '}
					<Link
							onClick={() => localStorage.setItem('podcastChannel', props.podcast.xml)}
							to={{
									pathname: `/channel/${props.podcast.id}`
							}}>
							{props.podcast.collection}
					</Link>
			</div>

	)
}

export default connect()(SearchResults)