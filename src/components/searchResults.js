import React from 'react';
import {Link} from 'react-router-dom'
import { getChannel } from '../actions/search';

export default function SearchResults(props){
        return(
            <div>
                {props.resultNumber +': '}
                <Link
                    onClick={()=>getChannel(props.podcast.xml)}
                    to={{
                        pathname:`/channel/${props.podcast.id}` }}>
                    {props.podcast.collection}
                </Link>
            </div>
            
        )
}

