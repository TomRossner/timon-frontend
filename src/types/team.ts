import { Players } from "./player";
import { UserSummary } from "./user";

export type TeamID = string;

export type TeamData = {
    teamId: TeamID;
    name: string;
    manager: UserSummary;
    coaches: Players;
    roster: Players;
    logo: string;
    address: Address;
}

export type Address = {
    city: string;
    fieldAddress: string;
    fieldName?: string;
    location: {
        lat: number;
        long: number;
    }
}

export type Team = TeamData;

export type Teams = Map<TeamID, TeamData>;