import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/Auth/authReducer";
import { useDispatch } from "react-redux";
import stripeReducer from "../features/Stripe/stripeReducer";
import orderReducer from "../features/Order/orderReducer";
import carReducer from "../features/Car/carReducer";

const store = configureStore({
  reducer: {
    auth: authReducer,
    stripe: stripeReducer,
    order: orderReducer,
    car: carReducer,
  },
});
export const useAppDispatch = () => useDispatch<typeof store.dispatch>;
export type RootState = ReturnType<typeof store.getState>;
export default store;
