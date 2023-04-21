import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../infrastructure/utils/System";
import { RootState } from "../../infrastructure/store";

interface ICarState {
  cars: Car[];
}

const initialState: ICarState = {
  cars: [],
};

export type Car = {
  id: number;
  name: string;
  unavailable: Date[];
  isPicked: boolean;
};

export type CreateCarRequest = {
  name: string;
  mileageAtPurchase: number;
  purchasePrice: number;
};

export const createCar = createAsyncThunk<
  Car,
  CreateCarRequest,
  { state: RootState }
>("createCar", async (createCarRequest: CreateCarRequest, { getState }) => {
  const token = getState().auth.token;
  const [error, response] = await api.post(`/api/car`, createCarRequest, token);
  if (error) {
    return error;
  }
  return response;
});

export const getCars = createAsyncThunk<Car[]>("getCars", async () => {
  const [error, response] = await api.get(`/api/car`);
  if (error) {
    return error;
  }
  return response;
});

export const carSlice = createSlice({
  initialState,
  name: "carState",
  reducers: {
    pickCar(state, payload: PayloadAction<number>) {
      state.cars = state.cars.map((value, index) => {
        return { ...value, isPicked: index == payload.payload };
      });
    },
  },
  extraReducers(builder) {
    builder.addCase(getCars.fulfilled, (state, action) => {
      if (action.payload) {
        state.cars = action.payload;
      }
    });
  },
});

export default carSlice.reducer;
export const { pickCar } = carSlice.actions;
