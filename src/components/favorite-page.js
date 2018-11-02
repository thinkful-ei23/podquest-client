import React from "react";
import requiresLogin from "./requires-login";
import { connect } from 'react-redux';
import { getFavorite } from "../actions/favorite";
import { getChannel } from "../actions/search";

export class FavoritePage extends React.Component {
  componentDidMount() {
    // this.props.dispatch(getChannel(channelUrl))
  }
  componentWillMount() {
    console.log('here');
    this.props.dispatch(getFavorite());
  }
  
  render(){
    return (
      <div></div>
    )
  }
}

const mapStateToProps = state => {
  console.log('state', state); // to look at state
  return {
    info: state
  }
}

export default requiresLogin()(connect(mapStateToProps)(FavoritePage));