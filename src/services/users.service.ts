import { Users } from "@/types/user";
import axios from "axios";

export const createMockUsers = async () => {
    return await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/create-mock`);
}

export const getUsers = async () => {
    const { data } = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users`);
    console.log(data);

    const users = new Map(Object.entries(data).map((entry => entry)));

    return users as Users;
}