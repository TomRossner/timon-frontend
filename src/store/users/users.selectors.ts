import { RootState } from "../store";

export const selectUsers = (state: RootState) => state.users.users;
export const selectIsUsersLoading = (state: RootState) => state.users.isUsersLoading;
export const selectUsersError = (state: RootState) => state.users.usersError;