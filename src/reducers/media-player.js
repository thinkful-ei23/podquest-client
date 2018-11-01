import {
	SET_EPISODE
} from '../actions/media-player';

import { CLEAR_AUTH } from '../actions/auth'

const initialState = {
	episodeData: null
};

export default function reducer(state = initialState, action) {
	if (action.type === CLEAR_AUTH) {
		return Object.assign({}, state, initialState);
	}
	if (action.type === SET_EPISODE) {
		return Object.assign({}, state, {
			episodeData: action.episodeData
    });
  }
  return state;
}
