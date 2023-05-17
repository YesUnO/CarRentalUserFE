import {
  createSlice,
  createAsyncThunk,
  ThunkAction,
  PayloadAction,
  SerializedError,
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

//TODO: figure out types, figure out how to create request obj
export const getToken = createAsyncThunk<
  TokenResponse,
  PasswordCredentialsRequest
>("loginPw", async (credentials: PasswordCredentialsRequest, thunkApi) => {
  const { username, password } = credentials;
  const payload: UrlEncodedOptions = {
    client_Id: "local-dev",
    grant_type: "password",
    username: username,
    password: password,
  };
  const [error, response] = await api.postUrlEncoded("/connect/token", payload);
  if (error) {
    return thunkApi.rejectWithValue(error);
  }
  return response;
});

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

export const registerAndLogin =
  (
    registration: RegisterRequest
  ): ThunkAction<Promise<RegisterErrorsResponse>, RootState, unknown, any> =>
  (dispatch) => {
    return dispatch(register(registration)).then((result) => {
      console.log(result);
      if (result.type == "register/rejected") {
        let payload = {
          errors: { password: ["?"], username: ["?"], email: ["/"], phoneNumber: ["/"] },
        } as RegisterErrorsResponse;
        if ((result.payload as { errors:{PhoneNumber: string[] | undefined }}).errors.PhoneNumber) {
          console.log("yo", payload);
          payload = {errors: {phoneNumber: (result.payload as { errors:{PhoneNumber: string[] | undefined }}).errors.PhoneNumber, },};
          console.log(payload);
        } else {
          payload = result.payload as RegisterErrorsResponse;
        }
        return payload;
      }
      const credentials: PasswordCredentialsRequest = {
        password: registration.password,
        username: registration.username,
      };
      dispatch(getToken(credentials));
      return { errors: {} };
    });
  };

export const loginAndGetUser =
  (
    credentials: PasswordCredentialsRequest
  ): ThunkAction<Promise<ErrorResponse>, RootState, unknown, any> =>
  async (dispatch, getState) => {
    try {
      const result = await dispatch(getToken(credentials));
      if (result.type === "loginPw/rejected") {
        return { error: "Incorrect password or username." };
      }
      dispatch(parseToken());
      if (getState().authService.role === "Customer") {
        const finalResult = await dispatch(getUser());
        if (finalResult.type === "userRequest/rejected") {
          return { error: "Incorrect password or username." };
        }
      }
      return { error: undefined };
    } catch (error) {
      return { error: "An error occurred." };
    }
  };

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
    builder.addCase(getToken.pending, (state) => {
      state.loading.getToken = true;
    });
    builder.addCase(getToken.fulfilled, (state, { payload }) => {
      state.loading.getToken = false;
      if (payload) {
        state.token = payload.token_type + " " + payload.access_token;
      }
    });
    builder.addCase(getToken.rejected, (state, action) => {
      state.loading.getToken = false;
    });

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
