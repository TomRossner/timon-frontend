import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { PreloadedState } from "@/store/store";
import { getTeams } from "@/services/teams.service";
import { getUsers } from "@/services/users.service";
import { teamsSlice } from "@/store/teams/teams.slice";
import { usersSlice } from "@/store/users/users.slice";
import ReduxProvider from "./ReduxProvider";
import NavBar from "../components/NavBar";
import { eventsSlice } from "@/store/events/events.slice";
import { getEvents } from "@/services/events.service";
import AuthProvider from "./teams/AuthProvider";
import DeleteAccountModal from "@/components/DeleteAccountModal";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Timon",
  description: "Ultimate Frisbee Event Management System",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [
    teamsArray,
    usersArray,
    eventsArray
  ] = await Promise.all([
    getTeams(),
    getUsers(),
    getEvents(),
  ]);
  
  const preloadedState: PreloadedState = {
    [teamsSlice.name]: {
      teams: teamsArray,
      isTeamsLoading: false,
      teamsError: null,
    },
    [usersSlice.name]: {
      users: usersArray,
      isUsersLoading: false,
      usersError: null,
    },
    [eventsSlice.name]: {
      events: eventsArray,
      isEventsLoading: false,
      eventsError: null,
    },
  }
  return (
    // html lang should also be in state
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ReduxProvider preloadedState={preloadedState}>
          <AuthProvider>
            <NavBar />
            <DeleteAccountModal />
            {children}
          </AuthProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
