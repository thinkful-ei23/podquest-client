import React from 'react';
import ReactTable from 'react-table';
import { Link } from 'react-router-dom';

import 'react-table/react-table.css';
import './showTable.css';

export default class ResultTable extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			page: 0
		}
	}
	componentDidUpdate(prevProps) {
		if (this.props.podcasts !== prevProps.podcasts) {
			this.setState({
				page: 0
			});
		}
	}
	handlePageChange(pageIndex) {
		this.setState({
			page: pageIndex
		});
	}

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
				Header: 'Your Search Yielded...',
				accessor: 'collection',
				Cell: ({ row }) => (
					<Link className='search-font'
						onClick={() =>
							localStorage.setItem('podcastChannel', row.collection.xml)
						}
						to={{
							pathname: `/channel`
						}}
					>
						<p
							style={{
								padding: "5px"
							}}
						>
							{row.collection.collectionName}
						</p>
					</Link>
				)
			}
		];

		return (
			<div className="search-results">
				<ReactTable
					data={data}
					columns={columns}
					page={this.state.page}
					onPageChange={(pageIndex) => this.handlePageChange(pageIndex)}
					defaultPageSize={10}
					className="-striped -highlight"
					getTdProps={() => {
						return {
							style: {
								padding: "0px"
							}
						}
					}}
				/>
			</div>
		);
	}
}
