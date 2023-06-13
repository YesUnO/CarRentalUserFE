import {
  createSlice,
  createAsyncThunk,
  ThunkAction,
  PayloadAction,
} from "@reduxjs/toolkit";
import {
  api,
  ErrorResponse,
  UrlEncodedOptions,
} from "../../infrastructure/utils/System";
import { getUser } from "../User/userReducer";
import { RootState } from "../../infrastructure/store";
import JWT from "jwt-decode";

interface IAuthState {
  token: undefined | string;
  role: TokenRoleClaim;
  loading: {
    getUser: boolean;
    register: boolean;
    getToken: boolean;
    externalLogin: boolean;
  };
  loginModalIsOpened: boolean;
  registerOrLogin: boolean;
  loginModalMessage: string;
}

type TokenRoleClaim = "Admin" | "Customer" | undefined;

type Token = {
  role: TokenRoleClaim;
};

const initialState: IAuthState = {
  token: undefined,
  role: undefined,
  loading: {
    getUser: false,
    register: false,
    getToken: false,
    externalLogin: false,
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

export const sendConfirmMail = createAsyncThunk<
  void,
  void,
  { state: RootState }
>("sendConfirmMail", async (_, thunkApi) => {
  const token = thunkApi.getState().authService.token;
  const [error, response] = await api.get(
    `/api/auth/ResendConfirmationEmail`,
    token
  );
  if (error) {
    return thunkApi.rejectWithValue(error);
  }
  return response;
});


const authSLice = createSlice({
  initialState,
  name: "authentification",
  reducers: {
    logout() {
      return initialState;
    },
    parseToken(state) {
      const decoded: Token = JWT(state.token as string);
      return {
        ...state,
        role: decoded.role,
      };
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
  },
});

export default authSLice.reducer;
export const {
  setRegisterOrLogin,
  logout,
  parseToken,
  setLoginModal,
  setLoginModalMsg,
} = authSLice.actions;
