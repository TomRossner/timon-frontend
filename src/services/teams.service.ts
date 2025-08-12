import { Teams } from "@/types/team";
import axios from "axios"

export const getTeams = async (): Promise<Teams> => {
    const { data } = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/teams`);

    const teams = Array.from(Object.values(data));
    return teams as Teams;
}