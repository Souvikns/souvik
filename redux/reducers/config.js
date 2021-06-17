import { createSlice } from '@reduxjs/toolkit';

const ConfigSlice = createSlice({
	name: 'settings',
	initialState: {
		theme: 'light'
	},
	reducers: {
		change: (state) => {
			if (state.theme === 'light') state.theme = 'dark';
			if (state.theme === 'dark') state.theme = 'light';
		}
	}
});

export const { change } = ConfigSlice.actions;

export default ConfigSlice.reducer;