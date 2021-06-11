import { configureStore } from '@reduxjs/toolkit';
import route from './reducers/route';

let store = configureStore({
	reducer: {
		route
	}
});

export {
	store
}