import { API_BASE_URL } from '../config';
import { normalizeResponseErrors } from './utils';

export const SUBSCRIBE_CHANNEL = 'SUBSCRIBE_CHANNEL';
export const subscribeChannel = subChannel => ({
	type: SUBSCRIBE_CHANNEL,
	subChannel
});

export const SUBSCRIPTION_REQUESTS = 'SUBSCRIPTION_REQUESTS';
export const subscriptionRequests = () => ({
	type: SUBSCRIPTION_REQUESTS
});

export const postSubscribe = (title, feedUrl) => (dispatch, getState) => {
	dispatch(subscriptionRequests());
	const authToken = getState().auth.authToken;
	return fetch(`${API_BASE_URL}/subscribe`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${authToken}`
		},
		body: JSON.stringify({ title, feedUrl })
	}).then(res => console.log(res));
};

export const getSubscriptions = () => (dispatch, getState) => {
	const authToken = getState().auth.authToken;
	dispatch(subscriptionRequests());
	return fetch(`${API_BASE_URL}/subscribe`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${authToken}`
		}
	})
		.then(res => normalizeResponseErrors(res))
		.then(res => res.json())
		.then(response => console.log(response));
};
