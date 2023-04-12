import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../infrastructure/utils/System";

const productId = process.env.STRIPE_PRODUCT_ID;

interface IStripeState{

};

const initialState: IStripeState = {

};

export const createCheckoutSession = createAsyncThunk<any>(
    "",
    async()=>{
        const [error, response] = await api.post("/api/stripe/checkout",{productId: productId as string});
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