import { RootState } from "../store";

export const selectEvents = (state: RootState) => state.events.events;