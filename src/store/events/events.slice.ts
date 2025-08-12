import { Events } from "@/types/event";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface EventsState {
    events: Events;
    isEventsLoading: boolean;
    eventsError: string | null;
}

const initialState: EventsState = {
    events: [],
    isEventsLoading: false,
    eventsError: null,
}

export const eventsSlice = createSlice({
    name: 'events',
    initialState,
    reducers: {
        setEvents(state, action: PayloadAction<Events>) {
            state.events = action.payload;
        }
    }
});

export const {
    setEvents,
} = eventsSlice.actions;

export default eventsSlice.reducer;