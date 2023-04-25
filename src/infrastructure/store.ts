import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/Auth/authReducer";
import { useDispatch } from "react-redux";
import stripeReducer from "../features/Stripe/stripeReducer";
import orderReducer from "../features/Order/orderReducer";
import carReducer from "../features/Car/carReducer";
import userReducer from "../features/User/userReducer";

const store = configureStore({
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  reducer: {
    userService: userReducer,
    authService: authReducer,
    stripeService: stripeReducer,
    ordersService: orderReducer,
    carsService: carReducer,
  },
});
export const useAppDispatch = () => useDispatch<typeof store.dispatch>;
export type RootState = ReturnType<typeof store.getState>;
export default store;
