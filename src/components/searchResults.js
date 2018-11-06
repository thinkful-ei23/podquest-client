import React from 'react';
import { Link } from 'react-router-dom';
import './searchResults.css';

export default function SearchResults(props) {
    return (
        <div>
            {props.resultNumber + ': \u00a0 '}
            <Link
                onClick={() => localStorage.setItem('podcastChannel', props.podcast.xml)}
                to={{
                    pathname: `/channel/${props.podcast.id}`
                }}>
                {props.podcast.collection}
            </Link>
        </div>
    )
}
