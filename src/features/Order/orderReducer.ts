import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../infrastructure/utils/System";
import { RootState } from "../../infrastructure/store";
import { Car } from "../Car/carReducer";

interface IOrderState {
  orders: Order[];
  newOrder: Order;
}

const initialState: IOrderState = {
  orders: [],
  newOrder: {
    id: undefined,
    startDate: new Date(),
    endDate: new Date(),
    created: new Date(),
    paid: false,
    car: null,
  },
};

export type Order = {
  id: number | undefined;
  startDate: Date | null;
  endDate: Date | null;
  created: Date | null;
  car: Car | null;
  paid: boolean;
};

export const payOrder = createAsyncThunk<any, any, { state: RootState }>(
  "payOrder",
  async (orderId: string, { getState }) => {
    const token = getState().auth.token;
    const [error, response] = await api.post(
      `/api/order/${orderId}`,
      {},
      token
    );
    if (error) {
      return error;
    }
    return response;
  }
);

export const orderSlice = createSlice({
  initialState,
  name: "orderState",
  reducers: {
    setNewOrder(state, { payload }: PayloadAction<Order>) {
      if (payload == null || payload == undefined) {
        state.newOrder = initialState.newOrder;
      } else {
        state.newOrder = payload;
      }
    },
  },
});

export default orderSlice.reducer;
export const { setNewOrder } = orderSlice.actions;
