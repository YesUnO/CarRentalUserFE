import {configureStore} from '@reduxjs/toolkit';
import authReducer from './auth/auth';
import { useDispatch } from 'react-redux';

const store = configureStore({reducer:{ auth: authReducer}});
export const useAppDispatch = () => useDispatch<typeof store.dispatch>