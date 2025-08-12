import { getAuthToken } from "@/services/auth.service";
import { UserProfile, User, LoginCredentials } from "@/types/user";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
    user: User | undefined;
    userProfile: UserProfile | undefined;
    isLoading: boolean;
    token: string | null;
    error: string | null;
}

const initialState: AuthState = {
    user: undefined,
    userProfile: undefined,
    token: null,
    isLoading: false,
    error: null,
}

export const fetchAuthToken = createAsyncThunk(
    'auth/fetchAuthToken',
    async (credentials: LoginCredentials, { rejectWithValue }) => {
        try {
            const { data: token } = await getAuthToken(credentials);
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
            state.userProfile = action.payload;
        },
        setAuthError(state, action: PayloadAction<string | null>) {
            state.error = action.payload;
            state.isLoading = false;
        },
        setIsAuthenticating(state, action: PayloadAction<boolean>) {
            state.isLoading = action.payload;
            state.error = null;
        },
        setToken(state, action: PayloadAction<string | null>) {
            state.token = action.payload;
            state.error = null;
            state.isLoading = false;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAuthToken.fulfilled, (state, action: PayloadAction<string>) => {
                state.token = action.payload;
                state.isLoading = false;
                state.error = null;
            })
            .addCase(fetchAuthToken.rejected, (state) => {
                state.token = null;
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
    setIsAuthenticating,
    setAuthError,
    setToken,
} = authSlice.actions;

export default authSlice.reducer;