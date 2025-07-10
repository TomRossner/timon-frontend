import { Users } from "@/types/user";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UsersState {
    users: Users;
    isUsersLoading: boolean;
    usersError: string | null;
}

const initialState: UsersState = {
    users: new Map(),
    isUsersLoading: false,
    usersError: null,
}

export const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        setUsers(state, action: PayloadAction<Users>) {
            state.users = action.payload;
        },
        setIsUsersLoading(state, action: PayloadAction<boolean>) {
            state.isUsersLoading = action.payload;
            state.usersError = null;
        },
        setUsersError(state, action: PayloadAction<string | null>) {
            state.usersError = action.payload;
        }
    }
});

export const {
    setUsers,
    setIsUsersLoading,
    setUsersError,
} = usersSlice.actions;

export default usersSlice.reducer;