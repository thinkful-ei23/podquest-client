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
export const GET_PODCAST_REQUEST = 'GET_PODCAST_REQUEST';
export const getPodcastRequest = () => ({
	type: GET_PODCAST_REQUEST
});

export const GET_PODCAST_ERROR = 'GET_PODCAST_ERROR';
export const getPodcastError = error => ({
	type: GET_CHANNEL_ERROR,
	error
});

export const GET_PODCAST_SUCCESS = 'GET_PODCAST_SUCCESS';
export const getPostcastSuccess = podcast => ({
	type: GET_PODCAST_SUCCESS,
	podcast
});

export const getPodcasts = (searchTerm, attr = '') => dispatch => {
	dispatch(getPodcastRequest());
	let proxy = 'https://cors-anywhere.herokuapp.com/';
	return fetch(
		proxy +
			`${ITUNES_API}/search?term=${searchTerm}&entity=podcast&attribute=${attr}`,
		{
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'X-Content-Type-Options': 'nosniff'
			}
		}
	)
		.then(res => normalizeResponseErrors(res))
		.then(res => res.json())
		.then(response => {
			console.log(response);
			let filteredResponse = response.results
				.filter(index => index.feedUrl)
				.map(result => {
					return {
						id: result.collectionId,
						collection: result.collectionName,
						xml: result.feedUrl,
						image: result.artworkUrl100
					};
				});
			// console.log(filteredResponse);
			dispatch(getPostcastSuccess(filteredResponse));
		})
		.catch(err => {
			dispatch(getPodcastError(err));
		});
};

export const getChannel = feedUrl => (dispatch, getState) => {
	dispatch(getChannelRequest());
	const authToken = getState().auth.authToken;
	return fetch(`${API_BASE_URL}/podcast`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${authToken}`
		},
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
