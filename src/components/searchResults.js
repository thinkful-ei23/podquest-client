import React from 'react';
import { Link } from 'react-router-dom';

export default function SearchResults(props) {
	return (
		<div>
			<Link
				to={{
					pathname: `/channel/${props.podcast.id}`
				}}
			>
				{props.podcast.collection}
			</Link>
		</div>
	);
}
