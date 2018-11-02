import React from 'react';
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
export function SearchResults(props){
        return(
            <div>
                {props.resultNumber +': '}
                <Link
                    onClick={() => localStorage.setItem('podcastChannel',props.podcast.xml)}
                    to={{
                        pathname:`/channel/${props.podcast.id}` }}>
                    {props.podcast.collection}
                </Link>
            </div>
            
        )
}

export default connect()(SearchResults)
