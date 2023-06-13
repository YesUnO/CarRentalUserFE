import {
  createSlice,
  createAsyncThunk,
  ThunkAction,
  PayloadAction,
} from "@reduxjs/toolkit";
import {
  api,
} from "../../infrastructure/utils/System";
import { RootState } from "../../infrastructure/store";

interface IAuthState {
  claims: {
    role: RoleClaim;
    email: string;
    name: string;
  }
  loading: {
    getUser: boolean;
    register: boolean;
  };
  loginModalIsOpened: boolean;
  registerOrLogin: boolean;
  loginModalMessage: string;
}

type RoleClaim = "Admin" | "Customer" | undefined;

const initialState: IAuthState = {
  claims: {
    role: undefined,
    email: "",
    name: ""
  },
  loading: {
    getUser: false,
    register: false,
  },
  loginModalIsOpened: false,
  registerOrLogin: false,
  loginModalMessage: "",
};

interface TokenResponse {
  access_token: string;
  expires_in: number;
  scope: string;
  token_type: string;
}

export type PasswordCredentialsRequest = {
  username: string;
  password: string;
};

export type RegisterRequest = {
  username: string;
  password: string;
  email: string;
  confimrPassword: string;
  phonenumber: string;
};

export type RegisterErrorsResponse = {
  errors: {
    password?: string[] | undefined;
    username?: string[] | undefined;
    email?: string[] | undefined;
    phoneNumber?: string[] | undefined;
  };
};

export const register = createAsyncThunk<TokenResponse, RegisterRequest>(
  "register",
  async (registration: RegisterRequest, thunkApi) => {
    const [error, response] = await api.post("/api/auth", registration);
    if (error) {
      return thunkApi.rejectWithValue(error);
    }
    return response;
  }
);

export const getUserClaims = createAsyncThunk<TokenResponse, RegisterRequest>(
  "getUserClaims",
  async (registration: RegisterRequest, thunkApi) => {
    const [error, response] = await api.bffGet("bff/user");
    if (error) {
      return thunkApi.rejectWithValue(error);
    }
    return response;
  }
);

export const sendConfirmMail = createAsyncThunk<
  void,
  void,
  { state: RootState }
>("sendConfirmMail", async (_, thunkApi) => {
  const [error, response] = await api.get(
    `/api/auth/ResendConfirmationEmail`,
  );
  if (error) {
    return thunkApi.rejectWithValue(error);
  }
  return response;
});

export const registerCall =
  (
    registration: RegisterRequest
  ): ThunkAction<Promise<RegisterErrorsResponse>, RootState, unknown, any> =>
  (dispatch) => {
    return dispatch(register(registration)).then((result) => {
      if (result.type == "register/rejected") {
        let payload = result.payload as RegisterErrorsResponse;
        if (
          (result.payload as { errors: { PhoneNumber: string[] | undefined } })
            .errors.PhoneNumber
        ) {
          payload = {
            errors: {
              phoneNumber: (
                result.payload as {
                  errors: { PhoneNumber: string[] | undefined };
                }
              ).errors.PhoneNumber,
            },
          };
        }
        return payload;
      }
      return { errors: {} };
    });
  };

const authSLice = createSlice({
  initialState,
  name: "authentification",
  reducers: {
    logout() {
      return initialState;
    },
    setLoginModal(state, action: PayloadAction<boolean>) {
      if (!action.payload) {
        state.loginModalMessage = "";
      }
      state.loginModalIsOpened = action.payload;
    },
    setLoginModalMsg(state, payload: PayloadAction<string>) {
      state.loginModalMessage = payload.payload;
    },
    setRegisterOrLogin(state, payload: PayloadAction<boolean>) {
      state.registerOrLogin = payload.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(register.pending, (state) => {
      state.loading.register = true;
    });
    builder.addCase(register.fulfilled, (state, { payload }) => {
      state.loading.register = false;
    });
    builder.addCase(register.rejected, (state, action) => {
      state.loading.register = false;
    });

    builder.addCase(sendConfirmMail.pending, (state) => {});
    builder.addCase(sendConfirmMail.fulfilled, (state, { payload }) => {});
    builder.addCase(sendConfirmMail.rejected, (state, action) => {});
    
    builder.addCase(sendConfirmMail.pending, (state) => {});
    builder.addCase(sendConfirmMail.fulfilled, (state, { payload }) => {});
    builder.addCase(sendConfirmMail.rejected, (state, action) => {});
  },
});

export default authSLice.reducer;
export const {
  setRegisterOrLogin,
  logout,
  setLoginModal,
  setLoginModalMsg,
} = authSLice.actions;
