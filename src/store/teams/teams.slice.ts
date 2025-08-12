import { Teams } from "@/types/team";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TeamsState {
    teams: Teams;
    isTeamsLoading: boolean;
    teamsError: string | null;
}

const initialState: TeamsState = {
    teams: [],
    isTeamsLoading: false,
    teamsError: null,
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