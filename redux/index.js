import { configureStore } from '@reduxjs/toolkit';
import route from './reducers/route';
import settings from './reducers/config';

let store = configureStore({
	reducer: {
		route,
		settings
	}
});

export {
	store
}