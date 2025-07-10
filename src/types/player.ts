import { TeamID } from "./team";
import { UID, UserSummary } from "./user";

export type Player = {
  user: UserSummary;
  teamId: TeamID;
  teamName: string;
  jerseyNumber: number;
  isCaptain?: boolean;
  role?: Role;
  injured?: boolean;
}

export type Role = "handler" | "cutter" | "hybrid";

export type Players = Map<UID, Player>;