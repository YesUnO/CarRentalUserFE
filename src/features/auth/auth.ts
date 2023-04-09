import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api, UrlEncodedOptions } from "../../utils/System";

interface IAuthState {
    token: null | string;
    loading: boolean;
}

const initialState: IAuthState = {
    token: null,
    loading: false
}

//TODO: figure out types, figure out how to create request obj
export const getToken = createAsyncThunk<any, { username: string, password: string }>('loginPw', async (credentials) => {
    const { username, password } = credentials;
    const payload: UrlEncodedOptions = {
        client_Id: 'local-dev',
        grant_type: 'password',
        username: username,
        password: password,
    }
    const [error, response] = await api.postUrlEncoded('/connect/token', payload);
    if (error) return false;
    console.log(response);
    return response.data;
})

const authSLice = createSlice({
    initialState,
    name: 'authentification',
    reducers: {
        logout: () => { initialState },
        yo: () => { }
    },
    extraReducers(builder) {
        builder.addCase(getToken.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(getToken.fulfilled, (state, action) => {
            state.loading = false;
            //TODO: sdomething?
        })
        builder.addCase(getToken.rejected, (state, action) => {
            state.loading = false;
            //TODO: sdomething?
        })
    },
});

export default authSLice.reducer;
export const { logout } = authSLice.actions;