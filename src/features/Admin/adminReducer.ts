import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../infrastructure/utils/System";
import { RootState } from "../../infrastructure/store";

interface IAdminState {
}

const initialState: IAdminState = {
};

export const somemethod = createAsyncThunk<
  void,
  void,
  { state: RootState }
>("somemethod", async (_, { getState }) => {
  const token = getState().authService.token;
  const [error, response] = await api.get("/api/stripe", token);
  if (error) {
    return error;
  }
  return response;
});

export const adminSlice = createSlice({
  initialState,
  name: "admin",
  reducers: {
    someaction: () => {
      
    },
  },
  extraReducers(builder) {
    builder.addCase(somemethod.fulfilled, (state, { payload }) => {
      
    });
  },
});

export default adminSlice.reducer;
export const { someaction } = adminSlice.actions;
