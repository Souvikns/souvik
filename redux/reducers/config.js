import { createSlice } from '@reduxjs/toolkit';

const ConfigSlice = createSlice({
	name: 'settings',
	initialState: {
		theme: 'light'
	},
	reducers: {
		change: (state) => {
			let root = window.document.documentElement;
			if (state.theme === "light") {
				root.classList.remove('light');
				root.classList.add("dark");
				state.theme = "dark";
			} else {
				root.classList.remove('dark');
				root.classList.add('light');
				state.theme = "light";
			}
		}
	}
});

export const { change } = ConfigSlice.actions;

export default ConfigSlice.reducer;