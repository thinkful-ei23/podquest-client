import { API_BASE_URL, ITUNES_API } from '../config';
import { normalizeResponseErrors } from './utils';

export const GET_CHANNEL_REQUEST = 'GET_CHANNEL_REQUEST';
export const getChannelRequest = () => ({
    type: GET_CHANNEL_REQUEST
});

export const GET_CHANNEL_SUCCESS = 'GET_CHANNEL_SUCCESS';
export const getChannelSuccess = channelInfo => ({
    type: GET_CHANNEL_SUCCESS,
    channelInfo
});

export const GET_CHANNEL_ERROR = 'GET_CHANNEL_ERROR';
export const getChannelError = error => ({
    type: GET_CHANNEL_ERROR,
    error
});
export const GET_PODCAST_SUCCESS = 'GET_PODCAST_SUCCESS'
export const getPostcastSuccess = podcast =>({
	type: GET_PODCAST_SUCCESS,
	podcast
})
export const getPodcasts = searchTerm => dispatch => {
	return fetch(`${ITUNES_API}/search?term=${searchTerm}&entity=podcast`, {
		method: 'GET',
		headers: { 'Content-Type': 'application/json' }
	})
		.then(res => {
			if (!res.ok) {
				if (
					res.headers.has('content-type') &&
					res.headers.get('content-type').startsWith('application/json')
				) {
					console.log(res.json());
					return res.json().then(err => Promise.reject(err));
				}
				return Promise.reject({
					code: res.status,
					message: res.statusText
				});
			}
			return res.json();
		})
		.then(res => {
			let response = res.results.map(result => {
				return {
					id: result.collectionId,
					collection: result.collectionName,
					xml: result.feedUrl,
					image: result.artworkUrl100
				};
			});
			//keep artistId, collectionName, feedUrl, artworkUrl100
			dispatch(getPostcastSuccess(response))
		});
};

export const getChannel = feedUrl => dispatch => {
	dispatch(getChannelRequest());
	return fetch(`${API_BASE_URL}/podcast`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ feedUrl })
	})
		.then(res => normalizeResponseErrors(res))
		.then(res => res.json())
		.then(channelInfo => {
			// console.log(channelInfo);
			dispatch(getChannelSuccess(channelInfo));
		})
		.catch(err => {
			dispatch(getChannelError(err));
		});
};
