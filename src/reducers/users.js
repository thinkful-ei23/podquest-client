import {
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_ERROR
} from '../actions/users';

import { CLEAR_AUTH } from '../actions/auth';

const initialState = {
  loading: false,
  error: null
};

export default function reducer(state = initialState, action) {
  if (action.type === CLEAR_AUTH) {
      return Object.assign({}, state, initialState);
  } else if (action.type === REGISTER_REQUEST) {
      return Object.assign({}, state, {
          loading: true,
          error: null
      });
  } else if (action.type === REGISTER_SUCCESS) {
      return Object.assign({}, state, {
          loading: false
      });
  } else if (action.type === REGISTER_ERROR) {
      return Object.assign({}, state, {
          loading: false,
          error: action.error
      });
  }
  return state;
}
