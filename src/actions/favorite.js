import { API_BASE_URL } from "../config";
import { normalizeResponseErrors } from "./utils";

export const GET_FAVORITE_SUCCESS = 'GET_FAVORITE_SUCCESS';
export const getFavoriteSuccess = favData => ({
  type: GET_FAVORITE_SUCCESS,
  favData
})
export const GET_FAVORITE_ERROR = 'GET_FAVORITE_ERROR';
export const getFavoriteError = error => ({
  type: GET_FAVORITE_ERROR,
  error
})

export const getFavorite = () => (dispatch, getState) => {
  const authToken = getState().auth.authToken
  return fetch(`${API_BASE_URL}/favorite`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${authToken}`
    }
  })
}

export const userFavoriteInfo = (feedUrl, title, guid) => (getState) => {
  const authToken = getState().auth.authToken;
  return fetch(`${API_BASE_URL}/favorite`, {
    method: 'POST',
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${authToken}`
    },
    body: JSON.stringify({ feedUrl, title, guid })
  })
    .then(res => normalizeResponseErrors(res))
    .then(res => res.json())
    .catch(err => next(err));
}

