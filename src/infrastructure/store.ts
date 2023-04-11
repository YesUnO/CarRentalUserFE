import {configureStore} from '@reduxjs/toolkit';
import authReducer from '../features/Auth/authReducer';
import { useDispatch } from 'react-redux';

const store = configureStore({reducer:{ auth: authReducer}});
export const useAppDispatch = () => useDispatch<typeof store.dispatch>
export type RootState = ReturnType<typeof store.getState>
export default store;