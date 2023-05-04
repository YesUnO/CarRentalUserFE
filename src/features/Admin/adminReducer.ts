import { ThunkAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../infrastructure/utils/System";
import { RootState } from "../../infrastructure/store";

interface IAdminState {
  customers: UserForAdmin[];
}

const initialState: IAdminState = {
  customers: [],
};

export enum DocType {
  DriversLicense = 0,
  IdentityCard = 1,
}

export type VerifyDocumentRequest = {
  docNr: string;
  userDocumentType: DocType;
  validTill: Date;
  customerMail: string;
};

export type UserForAdmin = {
  drivingLicenseImgBack: string;
  DrivingLicenseImgFront: string;
  IdCardImgBack: string;
  IdCardImgFront: string;
  hasDrivingLicenseVerified: boolean;
  hasIdCard: boolean;
  HasIdCardVerified: boolean;
  hasActivePaymentCard: boolean;
  email: string | null;
  hasEmailVerified: boolean;
  isApprooved: boolean;
};

export const getCustomerList = createAsyncThunk<
  UserForAdmin[],
  void,
  { state: RootState }
>("getCustomerList", async (_, thunkApi) => {
  const token = thunkApi.getState().authService.token;
  const [error, response] = await api.get("/api/user/list", token);
  if (error) {
    return thunkApi.rejectWithValue(error);
  }
  return response;
});

export const deleteUser = createAsyncThunk<void, string, { state: RootState }>(
  "deleteUser",
  async (name: string, thunkApi) => {
    const token = thunkApi.getState().authService.token;
    const [error, response] = await api.delete("/api/user", { name }, token);
    if (error) {
      return thunkApi.rejectWithValue(error);
    }
    return response;
  }
);

export const verifyDocument = createAsyncThunk<
  void,
  VerifyDocumentRequest,
  { state: RootState }
>("verifyDocument", async (request: VerifyDocumentRequest, thunkApi) => {
  const token = thunkApi.getState().authService.token;
  const [error, response] = await api.post(
    "/api/user/VerifyDocument",
    request,
    token
  );
  if (error) {
    return thunkApi.rejectWithValue(error);
  }
  return response;
});

export const verifyAndReload =
  (
    request: VerifyDocumentRequest
  ): ThunkAction<void, RootState, VerifyDocumentRequest, any> =>
  (dispatch, getState) => {
    dispatch(verifyDocument(request)).then((result) => {
      if (result.type == "register/rejected") {
        return;
      }
      dispatch(getCustomerList());
    });
  };

export const adminSlice = createSlice({
  initialState,
  name: "admin",
  reducers: {
    someaction: () => {},
  },
  extraReducers(builder) {
    builder.addCase(getCustomerList.fulfilled, (state, { payload }) => {
      state.customers = payload;
    });
  },
});

export default adminSlice.reducer;
export const { someaction } = adminSlice.actions;
