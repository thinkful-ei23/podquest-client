import React from 'react';
// import { connect } from 'react-redux';
import './searchForm.css';
export default function SearchForm(props) {
	let input;
	return (
		<form
			id="form-search"
			onSubmit={e => {
				e.preventDefault();
				props.onSubmit(input.value);
			}}
		>

			<h2 className="title-search" htmlFor="search-input">Search by keyword: </h2>
			<div className="input-label-div">
				<label className="input-label input-label-search" htmlFor="search-input">Type in search terms here...</label>
				<input
					className="input-box"
					id="search-input"
					name="search"
					// placeholder="Health, Fitness, Finanace, etc."
					ref={search => (input = search)}
onChange={e => props.handleInput(e)}
				/>
			</div>

			<div className="radio-row">
				<p>Narrow your search by...</p>
				<label className="container">
					<input
						type="radio"
						id="radio-search"
						name="title"
						value="titleTerm"
						checked={props.selectedOption === 'titleTerm'}
						onChange={e => props.handleOptionChange(e)}
					/><span className="checkmark"></span>


					<span className="checkmark"></span>
					<p className="search-by-terms">Title </p>

					
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
					<p className="search-by-terms">Genre</p>

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
					<p className="search-by-terms">Description</p>

				</label>
			</div>
			<button
				className="btn btn-med btn-yellow2 btn-search search-button"
				disabled={!props.search}
			>
				Search
			</button>
		</form>
	);
}

// export default connect()(SearchForm);
