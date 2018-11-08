import { API_BASE_URL } from '../config';
// import { normalizeResponseErrors } from './utils';

export const SUBSCRIBE_CHANNEL = 'SUBSCRIBE_CHANNEL';
export const subscribeChannel = subChannel => ({
	type: SUBSCRIBE_CHANNEL,
	subChannel
});

export const POST_CHANNEL = 'POST_CHANNEL';
export const postChannelRequest = () => ({
	type: POST_CHANNEL
});

export const postSubscribe = (title, feedUrl) => (dispatch, getState) => {
	dispatch(postChannelRequest());
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
