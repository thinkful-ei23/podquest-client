import React from 'react';
import ReactTable from 'react-table';
// import { render } from 'react-dom';
import SearchResults from './searchResults';
// import pages from './makePages';
import './showResults.css';
import "react-table/react-table.css";

export default class ShowResults extends React.Component {
	// componentWillMount() {
	// 	this.props.dispatch(searchResults());
	// }

	render() {
		// const data = this.props.podcasts
		const data = SearchResults
		// console.log(data, "looking for search")
		const columns = [{
			Header: '#',
			accessor: 'number',
		}, {
			Header: 'Title',
			accessor: 'collection',
		}]
		if (this.props.podcasts) {
			return (
				<div>
					<ReactTable
						data={[data]}
						// data={SearchResults}

						columns={columns}
						defaultPageSize={10}
						pageSizeOption={[5, 10, 15]}
						className="-striped -highlight"
					/>
				</div >
			)
		} else {
			return (
				<p>'Nothing to see for now. So...shall we search for a podcast?'</p>
			)
		}
	}
}