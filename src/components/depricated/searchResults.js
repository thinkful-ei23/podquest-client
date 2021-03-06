import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import './searchResults.css';

export function SearchResults(props) {
	return (
		<div className="search-results">
			{props.resultNumber + ': \u00a0 '}
			<Link
				onClick={() =>
					localStorage.setItem('podcastChannel', props.podcast.xml)
				}
				to={{
					pathname: `/channel`
				}}
			>
				{props.podcast.collection}
			</Link>
		</div>
	);
}

export default connect()(SearchResults);
