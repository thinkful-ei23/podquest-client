import { createStore, applyMiddleware, combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import thunk from 'redux-thunk';
import { loadAuthToken } from './local-storage';
import authReducer from './reducers/auth';
import userReducer from './reducers/users';
import protectedDataReducer from './reducers/protected-data';
import searchReducer from './reducers/search';
import mediaPlayerReducer from './reducers/media-player';
import favoritesReducer from './reducers/favorite';
import subscribeReducer from './reducers/subscribe';
import { setAuthToken, refreshAuthToken } from './actions/auth';

const store = createStore(
	combineReducers({
		form: formReducer,
		auth: authReducer,
		user: userReducer,
		protectedData: protectedDataReducer,
		search: searchReducer,
		mediaPlayer: mediaPlayerReducer,
		favorites: favoritesReducer,
		subscribe: subscribeReducer
	}),
	applyMiddleware(thunk)
);

// Hydrate the authToken from localStorage if it exist
const authToken = loadAuthToken();
if (authToken) {
	const token = authToken;
	store.dispatch(setAuthToken(token));
	store.dispatch(refreshAuthToken());
}

export default store;
