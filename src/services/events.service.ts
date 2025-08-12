import { Events } from "@/types/event";
import axios from "axios";

export const getEvents = async (): Promise<Events> => {
    const { data } = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/events`);

    const events = Array.from(Object.values(data));
    return events as Events;
}