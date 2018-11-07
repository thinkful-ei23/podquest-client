import React from 'react';
import ReactTable from 'react-table';
import { render } from 'react-dom';
import SearchResults from './searchResults';
import pages from './makePages';
import './showResults.css';

export default class ShowResults extends React.Component {
	constructor() {
		super();
		this.state = {
			data: ''
		};
	}
	render() {
		const data = [{
			number: 26,
			title: 'Roy Agasthyan'
		}, {
			number: 36,
			title: 'Sam Thomason'
		}, {
			number: 36,
			title: 'Michael Jackson'
		}]
		// const data = { SearchResults }
		const columns = [{
			Header: 'number',
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

/*
	const columns = [{
			Header: 'number',
			accessor: 'number',
			Footer: (
				{
					searchResults && this.state.page > 0 ? (
						<button
							className="btn btn-large btn-yellow2 btn-previous"
							onClick={e => this.handleLess(e)}
						>
							Previous Results
					</button>
					) : (
							''
						)
				}
			)
		}, {
			Header: 'Title',
			accessor: 'title',
			Footer: (
				{
					searchResults && this.state.page < searchResults.length - 1 ? (
						<button
							className="btn btn-large btn-yellow2 btn-more"
							onClick={e => this.handleMore(e)}
						>
							Show More Results
						</button>
					) : (
							''
						)
				}
			)
		}]
		*/