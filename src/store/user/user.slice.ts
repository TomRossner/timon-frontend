import { UserProfile, User } from "@/types/user";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface AuthState {
    user: User | undefined;
    UserProfile: UserProfile | undefined;
    isLoading: boolean;
    authToken: string | null;
    error: string | null;
}

const initialState: AuthState = {
    user: undefined,
    UserProfile: undefined,
    authToken: null,
    isLoading: false,
    error: null,
}

type Credentials = {
    email: string;
    password: string;
}

export const fetchAuthToken = createAsyncThunk(
    'auth/fetchAuthToken',
    async (credentials: Credentials, { rejectWithValue }) => {
        try {
            const {data: token} = await axios.post(`${process.env.BACKEND_URL as string}/auth/`, credentials);
            return token;
        } catch (error) {
            if (error instanceof Error) {
                return rejectWithValue(error.message);
            }

            return rejectWithValue('Authentication failed');
        }
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser(state, action: PayloadAction<User | undefined>) {
            state.user = action.payload;
        },
        setUserProfile(state, action: PayloadAction<UserProfile | undefined>) {
            state.UserProfile = action.payload;
        },
        setAuthError(state, action: PayloadAction<string | null>) {
            state.error = action.payload;
            state.isLoading = false;
        },
        setIsLoading(state, action: PayloadAction<boolean>) {
            state.isLoading = action.payload;
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAuthToken.fulfilled, (state, action: PayloadAction<string>) => {
                state.authToken = action.payload;
                state.isLoading = false;
                state.error = null;
            })
            .addCase(fetchAuthToken.rejected, (state) => {
                state.authToken = null;
                state.error = "Authentication failed";
                state.isLoading = false;
            })
            .addCase(fetchAuthToken.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
    }
});

export const {
    setUser,
    setUserProfile,
    setIsLoading,
    setAuthError,
} = authSlice.actions;

export default authSlice.reducer;