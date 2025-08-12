import { combineReducers } from "@reduxjs/toolkit";
import teamsReducer from "./teams/teams.slice";
import usersReducer from "./users/users.slice";
import eventsReducer from "./events/events.slice";
import authReducer from "./auth/auth.slice";

const rootReducer = combineReducers({
    teams: teamsReducer,
    users: usersReducer,
    events: eventsReducer,
    auth: authReducer,
});

export default rootReducer;