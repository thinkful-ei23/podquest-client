import { ITUNES_API } from '../config';

export const getPodcasts = searchTerm => dispatch => {
	return fetch(`${ITUNES_API}/search?term=${searchTerm}&entity=podcast`, {
		method: 'GET',
		headers: { 'Content-Type': 'application/json' }
	}).then(res => console.log(res));
};
