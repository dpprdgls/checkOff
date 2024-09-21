import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

//fetch user profile
export const fetchUserProfile = createAsyncThunk(
    'user/fetchUserProfile',
    async (userId) => {
        const response = await fetch(`/api/users/${userId}`);
        const data = await response.json();
        return data;
    }
);

//thunk to log in a user
export const loginUser = createAsyncThunk(
    'user/loginUser',
    async (credentials) => {
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credentials),
        });
        const data = await response.json();
        return data;
    }
);

const userSlice = createSlice({
    name: 'user',
    initialState: {
        profile: null,
        isLoading: false,
        error: null,
        isAuthenticated: false,
    },
    reducers: {
        logout: (state) => {
            state.profile = null;
            state.isAuthenticated = false;
        },
    },
    extraReducers: (builder) => {
        builder
        //fetch user profile
        .addCase(fetchUserProfile.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        })
        .addCase(fetchUserProfile.fulfilled, (state, action) => {
            state.isLoading = false;
            state.profile = action.payload;
            state.isAuthenticated = true;
        })
        .addCase(fetchUserProfile.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
        })

        //login user
        .addCase(loginUser.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        })
        .addCase(loginUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.profile = action.payload.user;
            state.isAuthenticated = true;
        })
        .addCase(loginUser.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
        });
    }
});

export const { logout } = userSlice.actions;

export const selectUserProfile = (state) => state.user.profile;
export const selectIsAuthenticated = (state) => state.user.isAuthenticated;
export const selectIsLoading = (state) => state.user.isLoading;
export const selectUserError = (state) => state.user.error;

export default userSlice.reducer;