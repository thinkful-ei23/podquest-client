import { API_BASE_URL, ITUNES_API, GPODDER_API } from '../config';
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
	let proxy = 'https://cors-anywhere.herokuapp.com';

	function itunesFetch() {
		return fetch(
			`${proxy}/${ITUNES_API}/search?term=${searchTerm}&entity=podcast&attribute=${attr}`,
			{
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					'X-Content-Type-Options': 'nosniff'
				}
			}
		);
	}

	function gpodderFetch() {
		return fetch(`${proxy}/${GPODDER_API}/search.json?q=${searchTerm}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'X-Content-Type-Options': 'nosniff'
			}
		});
	}

	Promise.all([itunesFetch(), gpodderFetch()])
		.then(res => {
			return Promise.all(res.map(res => res.json()));
		})
		.then(res => {
			const itunesRes = res[0].results;
			// console.log('itunesRes', itunesRes);
			const normalizedRes = itunesRes
				.filter(channel => channel.feedUrl)
				.map(channel => {
					return {
						collection: channel.collectionName,
						xml: channel.feedUrl,
						image: channel.artworkUrl100
					};
				});
			// console.log('normalizedRes', normalizedRes);

			const gpodderRes = res[1];
			// console.log('gpodderRes', gpodderRes);
			gpodderRes.forEach(channel => {
				let dupe = false;
				const gTitle = channel.title;
				const gXml = channel.url;
				const gImage = channel.logo_url;
				for (let i = 0; i < normalizedRes.length; i++) {
					const existTitle = normalizedRes[i].collection;
					const existXml = normalizedRes[i].xml;
					if (gTitle === existTitle || gXml === existXml) {
						// console.log('dupe found');
						dupe = true;
						break;
					}
				}
				if (!dupe) {
					// console.log('adding new podcast');
					normalizedRes.push({
						collection: gTitle,
						xml: gXml,
						image: gImage
					});
				}
			});
			// console.log('normalizedRes', normalizedRes);
			dispatch(getPostcastSuccess(normalizedRes));
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
