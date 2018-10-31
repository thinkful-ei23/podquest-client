import React from 'react';
import {connect} from 'react-redux'

class Channel extends React.Component{
    

    render(){
        console.log('props', this.props); // see podcasts
        if (!this.props.podcasts) {
            return <div>Loading...</div>;
        }
        const podcast = this.props.podcasts.find(podcast =>  {
            // console.log(typeof podcast.id)  // Type of is different so we used just ==
            // console.log('this.props.match.params.id', typeof this.props.match.params.id);
            return podcast.id === Number(this.props.match.params.id)
        })
        console.log('podcast', podcast);
        return(
            <div>
                <span>{podcast.collection}</span>
                <img src={podcast.image} alt="podcast wallpaper" height={200}/>
            </div>
        )
    }
}

const mapStateToProps = state => {
    console.log('state', state); // to look at state
    return {
        podcasts: state.search.podcasts
    }
}

export default connect(mapStateToProps)(Channel)