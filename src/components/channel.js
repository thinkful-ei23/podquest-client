import React from 'react';
import {connect} from 'react-redux'

class Channel extends React.Component{

    render(){
        console.log('props', this.props);
        return(
            <div>
                Hello Channel
            </div>
        )
    }
}

const mapStateToProps = state => {
    console.log('state', state);
    return {
        image: state.search
    }
}

export default connect(mapStateToProps)(Channel)