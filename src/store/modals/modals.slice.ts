import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface ModalsState {
  deleteAccount: boolean;
}

const initialState: ModalsState = {
  deleteAccount: false,
}

const modalsSlice = createSlice({
  name: 'modals',
  initialState,
  reducers: {
    openModal: (state, action: PayloadAction<keyof ModalsState>) => {
        state[action.payload] = true;
    },
    closeModal(state, action: PayloadAction<keyof ModalsState>) {
        state[action.payload] = false;
    }
  },
});

export const { openModal, closeModal } = modalsSlice.actions;
export default modalsSlice.reducer;