import { createSlice } from "@reduxjs/toolkit";

interface INavigationState {
  activeTab: string;
}

const initialState: INavigationState = {
  activeTab: "rent",
};


export const navigationSlice = createSlice({
  initialState,
  name: "navigation",
  reducers: {
    setActiveTab(state, payload) {
        state.activeTab = payload.payload;
    },
  },
});

export default navigationSlice.reducer;
export const { setActiveTab } = navigationSlice.actions;
