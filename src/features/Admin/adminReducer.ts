import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../infrastructure/utils/System";
import { RootState } from "../../infrastructure/store";
import { User } from "../User/userReducer";

interface IAdminState {
  customers: User[],
};

const initialState: IAdminState = {
  customers:[],
};

export const getCustomerList = createAsyncThunk<
  User[],
  void,
  { state: RootState }
>("getCustomerList", async (_, { getState }) => {
  const token = getState().authService.token;
  const [error, response] = await api.get("/api/user/list", token);
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
    builder.addCase(getCustomerList.fulfilled, (state, { payload }) => {
      state.customers = payload;
    });
  },
});

export default adminSlice.reducer;
export const { someaction } = adminSlice.actions;
