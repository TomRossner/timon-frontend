import { LoginCredentials } from "@/types/user";
import axios from "axios";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL as string;
export const getAuthToken = async (credentials: LoginCredentials) => {
    return await axios.post(`${BACKEND_URL}/auth/login`, credentials);
}

export const googleLogin = () => window.location.href = `${BACKEND_URL}/auth/login/google`;

export const logout = async (uid: string) => await axios.post(`${BACKEND_URL}/auth/logout`, { uid });