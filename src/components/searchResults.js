import React from 'react';
import {Link} from 'react-router-dom'
import { getChannel } from '../actions/search';
import {connect} from 'react-redux'
function SearchResults(props){
        return(
            <div>
                {props.resultNumber +': '}
                <Link
                    onClick={()=>props.dispatch(getChannel(props.podcast.xml))}
                    to={{
                        pathname:`/channel/${props.podcast.id}` }}>
                    {props.podcast.collection}
                </Link>
            </div>
            
        )
}

export default connect()(SearchResults)