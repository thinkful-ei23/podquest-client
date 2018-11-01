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