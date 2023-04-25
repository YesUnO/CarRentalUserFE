import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../infrastructure/utils/System";
import { RootState } from "../../infrastructure/store";

interface IUserState {
  user: User;
}

const initialState: IUserState = {
  user: {
    hasDrivingLicense: true,
    hasIdCard: false,
    hasPaymentCard: false,
    email: null,
  },
};

export type User = {
  hasDrivingLicense: boolean;
  hasIdCard: boolean;
  hasPaymentCard: boolean;
  email: string | null;
};

export const userRequest = createAsyncThunk<
  void,
  void,
  { state: RootState }
>("userRequest", async (_, { getState }) => {
  const token = getState().authService.token;
  const [error, response] = await api.get("/api/stripe", token);
  if (error) {
    return error;
  }
  return response;
});

export const userSlice = createSlice({
  initialState,
  name: "stripe",
  reducers: {
    setUser: (state, { payload }: PayloadAction<User>) => {
      state.user = payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(userRequest.fulfilled, (state, { payload }) => {
      
    });
  },
});

export default userSlice.reducer;
export const { setUser } = userSlice.actions;
