import React from 'react';
import ReactTable from 'react-table';
import { Link } from 'react-router-dom';

import 'react-table/react-table.css';

export default class ResultTable extends React.Component {
	render() {
		const data = this.props.podcasts.map(result => ({
			collection: {
				collectionName: result.collection,
				xml: result.xml
			}
		}));
		// console.log(data);

		const columns = [
			{
				Header: 'Your search yielded',
				accessor: 'collection',
				Cell: ({ row }) => (
					<Link
						onClick={() =>
							localStorage.setItem('podcastChannel', row.collection.xml)
						}
						to={{
							pathname: `/channel`
						}}
					>
						{row.collection.collectionName}
					</Link>
				)
			}
		];

		return (
			<div className="search-results">
				<ReactTable data={data} columns={columns} />
			</div>
		);
	}
}
