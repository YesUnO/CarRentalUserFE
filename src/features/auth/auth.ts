import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface IAuthState  {
    token: null | string;
}

const initialState: IAuthState = {
    token:  null,
}

const authSLice = createSlice({
    initialState,
    name: '',
    reducers: {
        logout: () => {initialState},
        yo:() => {}
    }
});

export default authSLice.reducer;
export const {logout } = authSLice.actions;