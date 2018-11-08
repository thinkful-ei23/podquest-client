import { SUBSCRIBE_CHANNEL, SUBSCRIPTION_REQUESTS } from '../actions/subscribe';

const initialState = {
	subChannels: [],
	loading: false,
	error: null
};

export default function subscribeReducer(state = initialState, action) {
	if (action.type === SUBSCRIBE_CHANNEL) {
		return Object.assign({}, state, {
			subChannels: [action.subChannel, ...state.subChannels]
		});
	}
	if (action.type === SUBSCRIPTION_REQUESTS) {
		return Object.assign({}, state, {
			loading: true,
			error: null
		});
	}
	return state;
}
