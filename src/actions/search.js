import { ITUNES_API } from '../config';

export const getPodcasts = (searchTerm, attr = false) => dispatch => {
	return fetch(
		`${ITUNES_API}/search?term=${searchTerm}&entity=podcast&attribute=${attr}`,
		{
			method: 'GET',
			headers: { 'Content-Type': 'application/json' }
		}
	)
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

			console.log(response);
		});
};
