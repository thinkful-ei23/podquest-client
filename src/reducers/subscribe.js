import { SUBSCRIBE_CHANNEL } from '../actions/subscribe';

const initialState = {
	subChannels: []
};

export default function subscribeReducer(state = initialState, action) {
	if (action.type === SUBSCRIBE_CHANNEL) {
		return Object.assign({}, state, {
			subChannels: [action.subChannel, ...state.subChannels]
		});
	}
	return state;
}
