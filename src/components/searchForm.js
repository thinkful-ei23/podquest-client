import React from 'react';
import './searchForm.css';

export default function SearchForm(props) {
	let input;
	let submitButton;

	if (!props.search) {
		submitButton = (
			<button
				className="btn btn-med btn-yellow2 btn-search search-button disabled"
				disabled={!props.search}
			>
				Search
			</button>
		);
	} else {
		submitButton = (
			<button
				className="btn btn-med btn-yellow2 btn-search search-button"
				disabled={!props.search}
			>
				Search
			</button>
		);
	}

	return (
		<form
			id="form-search"
			onSubmit={e => {
				e.preventDefault();
				props.onSubmit(input.value);
			}}
		>
			<div className="input-label-div">
				<label
					className="input-label input-label-search"
					htmlFor="search-input"
				>
					Search by:
				</label>
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
				<p className="search-narrow">Category: </p>

				<label className="container">
					<input
						type="radio"
						id="radio-keyword"
						name="keyword"
						value="keyword"
						checked={props.selectedOption === 'keyword'}
						onChange={e => props.handleOptionChange(e)}
					/>
					<span className="checkmark" />
					<p className="search-by-terms">Keyword</p>
				</label>

				<label className="container">
					<input
						type="radio"
						id="radio-search"
						name="title"
						value="titleTerm"
						checked={props.selectedOption === 'titleTerm'}
						onChange={e => props.handleOptionChange(e)}
					/>
					{/* <span className="checkmark"></span> */}

					<span className="checkmark" />
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
					/>
					<span className="checkmark" />
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
					/>
					<span className="checkmark" />
					<p className="search-by-terms">Description</p>
				</label>
			</div>
			{/* <button
				className="btn btn-med btn-yellow2 btn-search search-button"
				disabled={!props.search}
			>
				Search
			</button> */}
			{submitButton}
		</form>
	);
}
