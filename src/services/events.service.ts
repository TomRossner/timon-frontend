import { Events } from "@/types/event";
import axios from "axios"

export const getEvents = async (): Promise<Events> => {
    // const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/events`);
    // const events = await response.json();

    // return events;
    const { data } = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/events`);
    console.log(data)

    const events = new Map(Object.entries(data).map((entry => entry)));

    return events as Events;
}