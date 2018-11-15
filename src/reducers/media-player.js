import {
	SET_EPISODE,
	CLEAR_EPISODE
} from '../actions/media-player';

import { CLEAR_AUTH } from '../actions/auth'

const initialState = {
	episodeData: null
};

export default function reducer(state = initialState, action) {
	if (action.type === SET_EPISODE) {
		return Object.assign({}, state, {
			episodeData: action.episodeData
		});
	}
	if (action.type === CLEAR_AUTH || action.type === CLEAR_EPISODE) {
		return Object.assign({}, state, initialState);
	}
  return state;
}
