import { GET_FAVORITE_SUCCESS, GET_FAVORITE_ERROR } from "../actions/favorite";

import { CLEAR_AUTH } from '../actions/auth'

const initialState = {
  favorites: null,
  error: null
}

export default function reducer(state = initialState, action) {
  if (action.type === CLEAR_AUTH) {
    return Object.assign({}, state, initialState);
  }
  else if (action.type === GET_FAVORITE_SUCCESS) {
    return Object.assign({}, state, {
      favorites: action.favData,
      error: null
    })
  }
  else if (action.type === GET_FAVORITE_ERROR) {
    return Object.assign({}, state, {
      error: action.error
    })
  }
  return state;
}