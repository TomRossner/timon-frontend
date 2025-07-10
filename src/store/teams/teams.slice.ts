import { Teams } from "@/types/team";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TeamsState {
    teams: Teams;
    isLoading: boolean;
    error: string | null;
}

const initialState: TeamsState = {
    teams: new Map(),
    isLoading: false,
    error: null,
}

export const teamsSlice = createSlice({
    name: 'teams',
    initialState,
    reducers: {
        setTeams(state, action: PayloadAction<Teams>) {
            state.teams = action.payload;
        }
    }
});

export const {
    setTeams,
} = teamsSlice.actions;

export default teamsSlice.reducer;