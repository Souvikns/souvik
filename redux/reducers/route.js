import { createSlice } from '@reduxjs/toolkit';

const RouteSlice = createSlice({
	name: "route",
	initialState: {
		currentRoute: 'Home'
	},
	reducers: {
		change: (state, action) => {
			state.currentRoute = action.payload;
		}
	}
})

export const { change } = RouteSlice.actions;

export default RouteSlice.reducer