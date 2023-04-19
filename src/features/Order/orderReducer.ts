import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../infrastructure/utils/System";
import { RootState } from "../../infrastructure/store";

interface IOrderState {};

const initialState: IOrderState = {};

export const payOrder = createAsyncThunk<any, any, { state: RootState }>(
  "stripeCheckoutSession",
  async (orderId: string, { getState }) => {
    const token = getState().auth.token;
    const [error, response] = await api.post(`/api/order/${orderId}`, {}, token);
    if (error) {
      return error;
    }
    return response;
  }
);

export const orderSlice = createSlice({
  initialState,
  name: "carState",
  reducers: {},
});

export default orderSlice.reducer;
export const {} = orderSlice.actions;