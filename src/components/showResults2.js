import React from 'react';
import ReactTable from 'react-table';
// import { render } from 'react-dom';
import SearchResults from './searchResults';
// import pages from './makePages';
import './showResults.css';
import "react-table/react-table.css";

export default class ShowResults extends React.Component {
	constructor() {
		super();
		this.state = {
			data: SearchResults
		};
	}
	render() {
		const searchResults = null;
		// if (this.props.podcasts) {
		// searchResults = (this.props.podcasts);

		const data = { SearchResults }
		const columns = [{
			Header: '#',
			accessor: 'number',
		}, {
			Header: 'Title',
			accessor: 'title',
		}]
		return (
			<div>
				<ReactTable
					data={[data]}
					columns={columns}
					defaultPageSize={10}
					pageSizeOption={[5, 10, 15]}
					className="-striped -highlight"
				/>
			</div >
		)
	}
};