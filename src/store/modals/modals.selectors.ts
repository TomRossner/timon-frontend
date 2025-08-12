import { RootState } from "../store";

export const selectDeleteAccount = (state: RootState): boolean => state.modals.deleteAccount;
