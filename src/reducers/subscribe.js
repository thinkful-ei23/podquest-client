import {
	SUBSCRIPTION_REQUESTS,
	GET_SUBSCRIPTIONS_SUCCESS,
	GET_SUBSCRIPTIONS_FAIL
} from '../actions/subscribe';

const initialState = {
	subChannels: [],
	loading: false,
	error: null,
	subscriptions: []
};

export default function subscribeReducer(state = initialState, action) {
	if (action.type === SUBSCRIPTION_REQUESTS) {
		return Object.assign({}, state, {
			loading: true,
			error: null
		});
	}
	if (action.type === GET_SUBSCRIPTIONS_SUCCESS) {
		// console.log('action', action.subs);
		return Object.assign({}, state, {
			loading: false,
			error: null,
			subscriptions: action.subs
		});
	}
	if (action.type === GET_SUBSCRIPTIONS_FAIL) {
		return Object.assign({}, state, {
			error: action.error,
			loading: false
		});
	}
	return state;
}
