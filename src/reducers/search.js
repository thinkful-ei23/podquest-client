import {
  GET_CHANNEL_REQUEST,
  GET_CHANNEL_SUCCESS,
  GET_CHANNEL_ERROR,
  GET_PODCAST_SUCCESS
} from '../actions/search';

const initialState = {
  podcasts:null,
  currChannel: null,
  error: null,
  loading: false
};

export default function reducer(state = initialState, action) {
  if (action.type === GET_CHANNEL_REQUEST) {
      return Object.assign({}, state, {
        currChannel: null,
        error: null,
        loading: true,
      });
  } else if (action.type === GET_CHANNEL_SUCCESS) {
      return Object.assign({}, state, {
        currChannel: action.channelInfo,
        error: null,
        loading: false
      });
  } else if (action.type === GET_CHANNEL_ERROR) {
      return Object.assign({}, state, {
        currChannel: null,
        error: action.error,
        loading: false
      });
  } else if (action.type === GET_PODCAST_SUCCESS){
    console.log(action)    
    return Object.assign({},{
      podcasts: action.podcast,
      loading: false
    })
  }
  return state;
}
