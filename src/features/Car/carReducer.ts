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
  pictureUrl: string;
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
>("createCar", async (createCarRequest: CreateCarRequest, thunkApi) => {
  const token = thunkApi.getState().authService.token;
  const [error, response] = await api.post(`/api/car`, createCarRequest, token);
  if (error) {
    return thunkApi.rejectWithValue(error);
  }
  return response;
});

export const getCars = createAsyncThunk<Car[]>("getCars", async (_,thunkApi) => {
  const [error, response] = await api.get(`/api/car`);
  if (error) {
    return thunkApi.rejectWithValue(error);
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
    clearPickedCar(state) {
      state.cars = state.cars.map((val) => {
        return { ...val, isPicked: false };
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
export const { pickCar, clearPickedCar } = carSlice.actions;
