import {
	SET_EPISODE
} from '../actions/media-player';

const initialState = {
	episodeUrl: null
};

export default function reducer(state = initialState, action) {
	if (action.type === SET_EPISODE) {
		return Object.assign({}, state, {
			episodeUrl: action.episodeUrl
    });
  }
  return state;
}
