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
export const POST_FAVORITE_ERROR = 'POST_FAVORITE_ERROR';
export const postFavoriteError = error => ({
  type: POST_FAVORITE_ERROR,
  error
})

async function getFavorites(authToken){
 return await fetch(`${API_BASE_URL}/favorite`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${authToken}`
    }
  })
}

export const getFavorite = () => (dispatch, getState) => {
  const authToken = getState().auth.authToken
  getFavorites(authToken)
  .then(res => normalizeResponseErrors(res))
  .then(res => res.json())
  .then(results => dispatch(getFavoriteSuccess(results)))
  .catch(err => getFavoriteError(err))
}

export const userFavoriteInfo = (feedUrl, title, mediaUrl) => (dispatch, getState) => {
  const authToken = getState().auth.authToken;
  return fetch(`${API_BASE_URL}/favorite`, {
    method: 'POST',
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${authToken}`
    },
    body: JSON.stringify({ feedUrl, title, mediaUrl })
  })
    .then(res => normalizeResponseErrors(res))
    .then(res => res.json())
    .catch(err => dispatch(postFavoriteError(err)));
}

export const deleteFavorite = title => (dispatch, getState) => {
  const authToken = getState().auth.authToken;
  return fetch(`${API_BASE_URL}/favorite`, {
    method: 'DELETE',
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${authToken}`
    },
    body: JSON.stringify({title})
  })
    .then(res => normalizeResponseErrors(res))
    // .then(res => res.json())
    .catch(err => console.log(err))
}


// Actions for clickedFav
export const CLICK_FAVORITE_SUCCESS = 'CLICK_FAVORITE_SUCCESS';
export const clickFavoriteSuccess = clickedFav => ({
  type: CLICK_FAVORITE_SUCCESS,
  clickedFav
})
export const CLICK_FAVORITE_ERROR = 'CLICK_FAVORITE_ERROR';
export const clickFavoriteError = error => ({
  type: CLICK_FAVORITE_ERROR,
  error
})