import { ThunkAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../infrastructure/utils/System";
import { RootState } from "../../infrastructure/store";
import { getCars } from "../Car/carReducer";

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
  drivingLicenseImgFront: string;
  idCardImgBack: string;
  idCardImgFront: string;
  hasDrivingLicenseVerified: boolean;
  hasIdCard: boolean;
  hasIdCardVerified: boolean;
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
  const [error, response] = await api.get("/api/user/list");
  if (error) {
    return thunkApi.rejectWithValue(error);
  }
  return response;
});

export const deleteUser = createAsyncThunk<void, string, { state: RootState }>(
  "deleteUser",
  async (email: string, thunkApi) => {
    const [error, response] = await api.delete(`/api/user/?email=${email}`);
    if (error) {
      return thunkApi.rejectWithValue(error);
    }
    return response;
  }
);

export const deleteCarPic = createAsyncThunk<void, number, { state: RootState }>(
  "deleteCarPic",
  async (carId: number, thunkApi) => {
    const [error, response] = await api.delete(`/api/car/${carId}`);
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
  const [error, response] = await api.post(
    "/api/user/VerifyDocument",
    request,
  );
  if (error) {
    return thunkApi.rejectWithValue(error);
  }
  return response;
});

export const approveCustomer = createAsyncThunk<
  void,
  string,
  { state: RootState }
>("approveCustomer", async (email: string, thunkApi) => {
  const [error, response] = await api.post(
    "/api/user/Approve",
    { email },
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
      if (result.type == "verifyDocument/rejected") {
        return;
      }
      dispatch(getCustomerList());
    });
  };

export const approveAndReload =
  (mail: string): ThunkAction<void, RootState, string, any> =>
  (dispatch, getState) => {
    dispatch(approveCustomer(mail)).then((result) => {
      if (result.type == "approveCustomer/rejected") {
        return;
      }
      dispatch(getCustomerList());
    });
  };

  export const deleteAndReload =
  (mail: string): ThunkAction<void, RootState, string, any> =>
  (dispatch, getState) => {
    dispatch(deleteUser(mail)).then((result) => {
      if (result.type == "deleteUser/rejected") {
        return;
      }
      dispatch(getCustomerList());
    });
  };

  export const deleteCarPicAndReload =
  (carId: number): ThunkAction<void, RootState, number, any> =>
  (dispatch, getState) => {
    dispatch(deleteCarPic(carId)).then((result) => {
      if (result.type == "deleteCarPic/rejected") {
        return;
      }
      dispatch(getCars());
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
