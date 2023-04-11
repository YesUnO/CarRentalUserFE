import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api, UrlEncodedOptions } from "../../infrastructure/utils/System";

interface IAuthState {
  token: null | string;
  loading: boolean;
}

const initialState: IAuthState = {
  token: null,
  loading: false,
};

interface TokenResponse {
  access_token: string;
  expires_in: number;
  scope: string;
  token_type: string;
}

export type PasswordCredentials = {
  username: string;
  password: string;
};

//TODO: figure out types, figure out how to create request obj
export const getToken = createAsyncThunk<TokenResponse, PasswordCredentials>(
  "loginPw",
  async (credentials: PasswordCredentials) => {
    const { username, password } = credentials;
    const payload: UrlEncodedOptions = {
      client_Id: "local-dev",
      grant_type: "password",
      username: username,
      password: password,
    };
    const [error, response] = await api.postUrlEncoded(
      "/connect/token",
      payload
    );
    if (error) {
      console.log(error);
      return false;
    }
    return response;
  }
);

const authSLice = createSlice({
  initialState,
  name: "authentification",
  reducers: {
    logout: () => {
      return initialState;
    },
  },
  extraReducers(builder) {
    builder.addCase(getToken.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getToken.fulfilled, (state, { payload }) => {
      state.loading = false;
      if (payload) {
        state.token = payload.token_type + ' ' + payload.access_token;
      }
      //TODO: sdomething?
    });
    builder.addCase(getToken.rejected, (state, action) => {
      state.loading = false;
      console.log(action);
      //TODO: sdomething?
    });
  },
});

export default authSLice.reducer;
export const { logout } = authSLice.actions;
