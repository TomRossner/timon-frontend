import { LoginCredentials } from "@/types/user";
import axios from "axios";

export const getAuthToken = async (credentials: LoginCredentials) => {
    return await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`, credentials);
}