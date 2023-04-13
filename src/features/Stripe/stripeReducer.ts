import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../infrastructure/utils/System";
import { request } from "../../infrastructure/utils/SimpleFetch";

const productId = process.env.STRIPE_PRODUCT_ID;

interface IStripeState{

};

const initialState: IStripeState = {

};

export const createCheckoutSession = createAsyncThunk(
    "stripeCheckoutSession",
    async()=>{
        request();
        // const [error, response] = await api.post("/api/stripe/CheckOutApi");
        // console.log(response);
    }
);

export const stripeSlice = createSlice({
    initialState,
    name: "stripe",
    reducers:{},
    extraReducers(builder) {
        
    },
});

export default stripeSlice.reducer;
export const {} = stripeSlice.actions;