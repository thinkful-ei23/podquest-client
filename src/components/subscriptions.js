import React from 'react';
import { connect } from 'react-redux';
import requiresLogin from './requires-login';

export class Subscriptions extends React.Component {
	// componentDidMount() {
	// console.log('componentDidMount', this.props.channel);
	// this.props.dispatch(checkNewEpisode())
	// this.props.dispatch(getAlert())
	// console.log(this.props.channel);
	// }

	render() {
		if (!this.props.channel) {
			return <div>Loading...</div>;
		}
		return (
			<div className="all-subscriptions">
				You are subscribed to:
				{/* {this.props.channel} */}
			</div>
		);
	}
}

const mapStateToProps = state => {
	console.log('state', state); // to look at state
	return {
		channel: state.subscribe.channels
	};
};

export default requiresLogin()(connect(mapStateToProps)(Subscriptions));
