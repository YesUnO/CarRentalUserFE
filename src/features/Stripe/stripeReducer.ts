import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../infrastructure/utils/System";
import { RootState } from "../../infrastructure/store";

interface IStripeState {
  checkoutSessionUrl: string | null;
}

const initialState: IStripeState = {
  checkoutSessionUrl: null,
};

export type CheckoutSessionResponse = {
  checkoutSessionUrl: string;
};

export const createCheckoutSession = createAsyncThunk<
  any,
  any,
  { state: RootState }
>("stripeCheckoutSession", async ({},{ getState }) => {
  console.log("ho");
  const token = getState().auth.token;
  const [error, response] = await api.get("/api/stripe", token);
  if (error) {
    return error;
  }
  return response;
});

export const stripeSlice = createSlice({
  initialState,
  name: "stripe",
  reducers: {
    clearOnLeavingPage: () => {
      return initialState;
    },
  },
  extraReducers(builder) {
    builder.addCase(createCheckoutSession.fulfilled, (state, { payload }) => {
      if (payload) {
        state.checkoutSessionUrl = payload.url;
      }
    });
  },
});

export default stripeSlice.reducer;
export const { clearOnLeavingPage } = stripeSlice.actions;
