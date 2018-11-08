import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import './searchResults.css';

function SearchResults(props) {
    return (
        <div>
            {props.resultNumber + ': \u00a0 '}
            <Link
                onClick={() => localStorage.setItem('podcastChannel', props.podcast.xml)}
                to={{
                    pathname: `/channel`
                }}>
                {props.podcast.collection}
            </Link>
        </div>

    )
}

export default connect()(SearchResults)
