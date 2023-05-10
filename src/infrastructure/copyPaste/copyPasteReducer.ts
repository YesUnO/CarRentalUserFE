import { createSlice } from "@reduxjs/toolkit";

interface ICopyPasteState {
  lastCopied: string;
}

const initialState: ICopyPasteState = {
  lastCopied: "",
};


export const copyPasteSlice = createSlice({
  initialState,
  name: "navigation",
  reducers: {
    setLastCopied(state, payload) {
        state.lastCopied = payload.payload;
    },
  },
});

export default copyPasteSlice.reducer;
export const { setLastCopied } = copyPasteSlice.actions;
