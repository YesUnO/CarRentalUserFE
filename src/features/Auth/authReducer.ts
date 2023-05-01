import {
  createSlice,
  createAsyncThunk,
  ThunkDispatch,
  ThunkAction,
} from "@reduxjs/toolkit";
import { api, UrlEncodedOptions } from "../../infrastructure/utils/System";
import { getUser } from "../User/userReducer";
import { RootState } from "../../infrastructure/store";
import JWT from "jwt-decode";
import { useNavigate } from "react-router-dom";

interface IAuthState {
  token: undefined | string;
  role: TokenRoleClaim;
  loading: boolean;
}

type TokenRoleClaim = "Admin" | "Customer" | undefined;

type Token = {
  role: TokenRoleClaim;
};

const initialState: IAuthState = {
  token: undefined,
  role: undefined,
  loading: false,
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
  async (registration: RegisterRequest) => {
    const [error, response] = await api.post("/api/auth", registration);
    if (error) {
      console.log(error);
      return error;
    }
    return response;
  }
);

export const login =
  (
    credentials: PasswordCredentialsRequest
  ): ThunkAction<void, RootState, unknown, any> =>
  (dispatch, getState) => {
    dispatch(getToken(credentials)).then((result) => {
      if (result.type == "loginPw/rejected") {
        return;
      }
      dispatch(parseToken());
      if (getState().authService.role == "Customer") {
        dispatch(getUser());
      }
    });
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
      state.role = decoded.role;
    },
  },
  extraReducers(builder) {
    builder.addCase(getToken.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getToken.fulfilled, (state, { payload }) => {
      state.loading = false;
      if (payload) {
        state.token = payload.token_type + " " + payload.access_token;
      }
      //TODO: sdomething?
    });
    builder.addCase(getToken.rejected, (state, action) => {
      state.loading = false;
      //TODO: sdomething?
    });

    builder.addCase(register.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(register.fulfilled, (state, { payload }) => {
      state.loading = false;
      if (payload) {
        state.token = payload.token_type + " " + payload.access_token;
      }
      //TODO: sdomething?
    });
    builder.addCase(register.rejected, (state, action) => {
      state.loading = false;
      //TODO: sdomething?
    });
  },
});

export default authSLice.reducer;
export const { logout, parseToken } = authSLice.actions;
