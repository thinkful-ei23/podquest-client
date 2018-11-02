import React from 'react';
// import { connect } from 'react-redux';
import './searchForm.css'
export default function SearchForm(props) {
	let input;
	return (
		<form id="form-search"
			onSubmit={e => {
				e.preventDefault();
				props.onSubmit(input.value);
			}}
		>
			<label className="input-label input-label-search" htmlFor="search-input">Search for keyword: </label>
			<input
				id="search-input"
				name="search"
				placeholder="Health, Fitness, Finanace, etc."
				ref={search => (input = search)}
			/>
			<div className="radio-row">
				<label className="container">
					<input
						type="radio"
						id="radio-search"
						name="title"
						value="titleTerm"
						checked={props.selectedOption === 'titleTerm'}
						onChange={e => props.handleOptionChange(e)}

					/><span className="checkmark"></span>
					<p>Title </p>
				</label>
				<label className="container">
					<input
						type="radio"
						id="radio-genre"
						name="genre"
						value="genreIndex"
						checked={props.selectedOption === 'genreIndex'}
						onChange={e => props.handleOptionChange(e)}
					/><span className="checkmark"></span>
					<p>Genre</p>
				</label>
				<label className="container">
					<input
						type="radio"
						id="radio-desc"
						name="desc"
						value="descriptionTerm"
						checked={(true, props.selectedOption === 'descriptionTerm')}
						onChange={e => props.handleOptionChange(e)}
					/><span className="checkmark"></span>
					<p>Description</p>
				</label>
			</div>
			<button className="btn btn-med btn-yellow2 btn-search search-button">Search</button>
		</form >
	);
}

		// export default connect()(SearchForm);
