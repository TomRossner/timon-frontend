import { Teams } from "@/types/team";
import axios from "axios"

export const getTeams = async (): Promise<Teams> => {
    // const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/teams`);
    // const teams = await response.json();

    // return teams;
    const { data } = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/teams`);
    console.log(data)

    const teams = new Map(Object.entries(data).map((entry => entry)));

    return teams as Teams;
}