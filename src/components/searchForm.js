import React from 'react';
import {connect} from 'react-redux';

function SearchForm(props){
    let input;
    return(
        <form onSubmit={(e)=>{
            e.preventDefault();
            console.log(' insert fetch action here: ', input.value)}} >
            <label htmlFor='search-input'>Search: </label>
            <input id='search-input' placeholder='Title,Description,etc.' ref={search =>input = search }/>
            <button className='search-button' >Search</button>
        </form>
    );
};


export default connect()(SearchForm);