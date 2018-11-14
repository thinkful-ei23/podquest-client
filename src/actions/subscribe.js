import { API_BASE_URL } from '../config';
import { normalizeResponseErrors } from './utils';

export const SUBSCRIPTION_REQUESTS = 'SUBSCRIPTION_REQUESTS';
export const subscriptionRequests = () => ({
	type: SUBSCRIPTION_REQUESTS
});

export const GET_SUBSCRIPTIONS_SUCCESS = 'GET_SUBSCRIPTIONS_SUCCESS';
export const getSubscriptionsSuccess = subs => ({
	type: GET_SUBSCRIPTIONS_SUCCESS,
	subs
});

export const GET_SUBSCRIPTIONS_FAIL = 'GET_SUBSCRIPTIONS_FAIL';
export const getSubscriptionFail = error => ({
	type: GET_SUBSCRIPTIONS_FAIL,
	error
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
	}).then(dispatch(getSubscriptions()));
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
		.then(response => {
			console.log(response);
			let mappedRes = response.map(res => {
				return { title: res.title, xml: res.feedUrl };
			});
			dispatch(getSubscriptionsSuccess(mappedRes));
		})
		.catch(err => dispatch(getSubscriptionFail(err)));
};

export const unsubscribe = title => (dispatch, getState) => {
	const authToken = getState().auth.authToken;
	dispatch(subscriptionRequests());
	return fetch(`${API_BASE_URL}/subscribe`, {
		method: `DELETE`,
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${authToken}`
		},
		body: JSON.stringify({ title})
	}).then(dispatch(getSubscriptions()));
};