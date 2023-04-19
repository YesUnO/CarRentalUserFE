import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../infrastructure/utils/System";
import { RootState } from "../../infrastructure/store";

interface ICarState {
    cars: Car[],
};

const initialState: ICarState = {
    cars: [],
};

export type Car = {
    name: string;
    unavailable: Date[];
};

export const getCars = createAsyncThunk<any, any, any>(
  "getCars",
  async () => {
    const [error, response] = await api.get(`/api/car`);
    if (error) {
      return error;
    }
    return response;
  }
);

export const carSlice = createSlice({
  initialState,
  name: "carState",
  reducers: {},
  extraReducers(builder) {
      builder.addCase(getCars.fulfilled,(state, action)=>{
        if (action.payload) {
            state.cars = action.payload;
        }
      })
  },
});

export default carSlice.reducer;
export const {} = carSlice.actions;