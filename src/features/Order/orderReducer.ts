import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../infrastructure/utils/System";
import { RootState } from "../../infrastructure/store";
import { Car } from "../Car/carReducer";

interface IOrderState {
  finishedOrders: Order[];
  unpaidOrders: Order[];
  futureOrders: Order[];
  orderDetail: Order | null;
  newOrder: NewOrder;
}

const initialState: IOrderState = {
  finishedOrders: [],
  unpaidOrders: [],
  futureOrders: [],
  orderDetail: null,
  newOrder: {
    carId: undefined,
    startDate: new Date(),
    endDate: new Date(),
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

export type NewOrder = {
  startDate: Date | null;
  endDate: Date | null;
  carId: number | undefined;
};

export const payOrder = createAsyncThunk<any, number, { state: RootState }>(
  "payOrder",
  async (orderId: number, thunkApi) => {
    const [error, response] = await api.post(
      `/api/order/${orderId}`,
      null,
    );
    if (error) {
      return thunkApi.rejectWithValue(error);
    }
    return response;
  }
);

export const getOrders = createAsyncThunk<Order[], void, { state: RootState }>(
  "getOrders",
  async (_, thunkApi) => {
    const [error, response] = await api.get(
      `/api/order`,
    );
    if (error) {
      return thunkApi.rejectWithValue(error);
    }
    return response;
  }
);

export const createOrder = createAsyncThunk<
  Order,
  CreateOrderRequest,
  { state: RootState }
>("createOrder", async (order: CreateOrderRequest, thunkApi) => {
  const [error, response] = await api.post(`/api/order`, order);
  if (error) {
    return thunkApi.rejectWithValue(error);
  }
  return response;
});

export const orderSlice = createSlice({
  initialState,
  name: "orderState",
  reducers: {
    setNewOrder(state, { payload }: PayloadAction<NewOrder>) {
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
  },
  extraReducers(builder) {
    builder.addCase(createOrder.fulfilled, (state, action) => {
      state.finishedOrders.push(action.payload);
    });
    //TODO: parse paid, unfifnished, unpaid
    builder.addCase(getOrders.fulfilled, (state,action)=>{
      state.futureOrders = action.payload;
      state.finishedOrders = action.payload;
      state.unpaidOrders = action.payload;
    });
  },
});

export default orderSlice.reducer;
export const { setNewOrder, setOrderDetail } =
  orderSlice.actions;
