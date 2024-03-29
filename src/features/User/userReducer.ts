import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../infrastructure/utils/System";
import { RootState } from "../../infrastructure/store";

interface IUserState {
  user: User;
}

const initialState: IUserState = {
  user: {
    hasDrivingLicense: false,
    hasDrivingLicenseVerified: false,
    hasIdCard: false,
    hasIdCardVerified: false,
    hasActivePaymentCard: false,
    email: null,
    hasEmailVerified: false,
    isApprooved: false,
    hasIdFrontImg: false,
    hasIdBackImg: false,
    hasDrivingLicenseFrontImg: false,
    hasDrivingLicenseBackImg: false,
  },
};

export type User = {
  hasIdFrontImg: boolean;
  hasIdBackImg: boolean;
  hasDrivingLicenseFrontImg: boolean;
  hasDrivingLicenseBackImg: boolean;
  hasDrivingLicense: boolean;
  hasDrivingLicenseVerified: boolean;
  hasIdCard: boolean;
  hasIdCardVerified: boolean;
  hasActivePaymentCard: boolean;
  email: string | null;
  hasEmailVerified: boolean;
  isApprooved: boolean;
};

export const getCustomer = createAsyncThunk<User, void, { state: RootState }>(
  "userRequest",
  async (_, thunkApi) => {
    const [error, response] = await api.get("/api/user");
    if (error) {
      return thunkApi.rejectWithValue(error);
    }
    return response;
  }
);

export const userSlice = createSlice({
  initialState,
  name: "userService",
  reducers: {
    setUser: (state, { payload }: PayloadAction<User>) => {
      state.user = payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(getCustomer.fulfilled, (state, { payload }) => {
      state.user = payload;
    });
  },
});

export default userSlice.reducer;
export const { setUser } = userSlice.actions;
