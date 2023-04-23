import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../infrastructure/utils/System";
import { RootState } from "../../infrastructure/store";
import { Car } from "../Car/carReducer";

interface IOrderState {
  finishedOrders: Order[];
  unpaidOrders: Order[];
  futureOrders: Order[];
  orderDetail: Order | null;
  newOrder: Order;
}

const initialState: IOrderState = {
  finishedOrders: [],
  unpaidOrders: [],
  futureOrders: [],
  orderDetail: null,
  newOrder: {
    id: undefined,
    startDate: new Date(),
    endDate: new Date(),
    created: new Date(),
    paid: false,
    car: null,
    price: null,
  },
};

export type Order = {
  id: number | undefined;
  startDate: Date | null;
  endDate: Date | null;
  created: Date | null;
  car: Car | null;
  paid: boolean;
  price: number | null;
};

export type CreateOrderRequest = {
  startDate: Date;
  endDate: Date;
  carId: number;
};

export const payOrder = createAsyncThunk<any, number, { state: RootState }>(
  "payOrder",
  async (orderId: number, { getState }) => {
    const token = getState().authService.token;
    const [error, response] = await api.post(
      `/api/order/${orderId}`,
      null,
      token
    );
    if (error) {
      return error;
    }
    return response;
  }
);

export const createOrder = createAsyncThunk<
  Order,
  CreateOrderRequest,
  { state: RootState }
>("createOrder", async (order: CreateOrderRequest, { getState }) => {
  const token = getState().authService.token;
  const [error, response] = await api.post(`/api/order`, order, token);
  if (error) {
    return error;
  }
  return response;
});

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
    setOrderDetail(state, { payload }: PayloadAction<Order>) {
      if (payload == null || payload == undefined) {
        state.orderDetail = initialState.orderDetail;
      } else {
        state.orderDetail = payload;
      }
    },
    setNewOrderCar(state, { payload }: PayloadAction<Car>) {
      state.newOrder.car = payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(createOrder.fulfilled, (state, action) => {
      state.finishedOrders.push(action.payload);
    });
  },
});

export default orderSlice.reducer;
export const { setNewOrder, setNewOrderCar, setOrderDetail } =
  orderSlice.actions;
