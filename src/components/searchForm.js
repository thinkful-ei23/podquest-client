import React from 'react';
import { connect } from 'react-redux';

export default function SearchForm(props) {
	let input;
	return (
		<form
			onSubmit={e => {
				e.preventDefault();
				props.onSubmit(input.value);
			}}
		>
			<label htmlFor="search-genre">Genre: </label>
			<input
				id="search-genre"
				name="genre"
				placeholder="Health, Fitness, Finanace, etc."
				ref={search => (input = search)}
			/>
			<label>
				<input
					type="radio"
					id="radio-search"
					name="title"
					value="titleTerm"
					checked={props.selectedOption === 'titleTerm'}
					onChange={e => props.handleOptionChange(e)}
				/>
				Title
			</label>
			<label>
				<input
					type="radio"
					id="radio-genre"
					name="genre"
					value="genreIndex"
					checked={props.selectedOption === 'genreIndex'}
					onChange={e => props.handleOptionChange(e)}
				/>
				Genre
			</label>
			<label>
				<input
					type="radio"
					id="radio-desc"
					name="desc"
					value="descriptionTerm"
					checked={(true, props.selectedOption === 'descriptionTerm')}
					onChange={e => props.handleOptionChange(e)}
				/>
				Description
			</label>

			<button className="search-button">Search</button>
		</form>
	);
}

// export default connect()(SearchForm);
