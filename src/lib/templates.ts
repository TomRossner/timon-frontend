import { EventData } from "@/types/event";

export const EVENT_TEMPLATE: Omit<EventData, "eventId"> = {
    organizers: new Map(),
    participants: new Map(),
    dates: {
        start: new Date(),
        end: new Date(),
    },
    description: "",
    teams: new Map(),
    eventName: ""
}