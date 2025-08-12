import { FullUser } from "@/types/user";
import { jwtDecode } from "jwt-decode";

export const decodeJwt = (token: string): FullUser | null => {
    return jwtDecode(token);
}