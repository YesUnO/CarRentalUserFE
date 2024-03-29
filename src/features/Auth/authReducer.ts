import {
  createSlice,
  createAsyncThunk,
  PayloadAction,
} from "@reduxjs/toolkit";
import { api } from "../../infrastructure/utils/System";
import { RootState } from "../../infrastructure/store";

interface IAuthState {
  claims: {
    role: RoleClaim;
    email: string;
    emailVerified: boolean;
    name: string;
  };
  loading: {
    getUser: boolean;
  };
  logoutUrl: string;
  isAuthenticated: boolean;
}

type RoleClaim = "Admin" | "Customer" | undefined;

const initialState: IAuthState = {
  claims: {
    role: undefined,
    emailVerified: false,
    email: "",
    name: "",
  },
  loading: {
    getUser: false,
  },
  logoutUrl: "",
  isAuthenticated: false,
};

export const getUserClaims = createAsyncThunk(
  "getUserClaims",
  async (_, thunkApi) => {
    const [error, response] = await api.get("/bff/user");
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
  const [error, response] = await api.get(`/api/auth/ResendConfirmationEmail`);
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
  },
  extraReducers(builder) {

    builder.addCase(sendConfirmMail.pending, (state) => {});
    builder.addCase(sendConfirmMail.fulfilled, (state, { payload }) => {});
    builder.addCase(sendConfirmMail.rejected, (state, action) => {});

    builder.addCase(getUserClaims.pending, (state) => {});
    builder.addCase(getUserClaims.fulfilled, (state, payload: PayloadAction<any>) => {
        const data = payload.payload;
        const nameClaim = data.find((claim: any) => claim.type == "name");
        const name = nameClaim && nameClaim.value;

        const roleClaim = data.find((claim: any) => claim.type == "role");
        const role = roleClaim && roleClaim.value;

        const emailClaim = data.find((claim: any) => claim.type == "email");
        const email = emailClaim && emailClaim.value;

        const emailVerifiedClaim = data.find((claim: any) => claim.type == "email_verified");
        const emailVerified = emailVerifiedClaim && emailVerifiedClaim.value;

        const logoutUrlClaim = data.find((claim: any) => claim.type == "bff:logout_url");
        const logoutUrl = logoutUrlClaim && logoutUrlClaim.value;

        state.claims = {
          role: role,
          name: name,
          email: email,
          emailVerified: emailVerified == "True",
        };

        state.logoutUrl = logoutUrl as string;

        state.isAuthenticated = !!logoutUrl && !!role && !!email;
      }
    );
    builder.addCase(getUserClaims.rejected, (state, action) => {});
  },
});

export default authSLice.reducer;
export const { logout } =
  authSLice.actions;
