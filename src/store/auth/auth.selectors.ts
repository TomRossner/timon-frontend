import { RootState } from "../store";

export const selectUserProfile = (state: RootState) => state.auth.userProfile;
export const selectToken = (state: RootState) => state.auth.token;
export const selectIsAuthenticating = (state: RootState) => state.auth.isLoading;
export const selectAuthError = (state: RootState) => state.auth.error;