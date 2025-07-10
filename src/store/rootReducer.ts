import { combineReducers } from "@reduxjs/toolkit";
import teamsReducer from "./teams/teams.slice";
import usersReducer from "./users/users.slice";

const rootReducer = combineReducers({
    teams: teamsReducer,
    users: usersReducer,
});

export default rootReducer;