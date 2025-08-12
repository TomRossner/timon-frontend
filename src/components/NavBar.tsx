'use client';

import Link from "next/link";
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink } from "./ui/navigation-menu";
import { useAppSelector } from "@/store/hooks";
import { selectUserProfile } from "@/store/auth/auth.selectors";

const NavBar = () => {
  const user = useAppSelector(selectUserProfile);

  return (
    <NavigationMenu className="flex max-w-full justify-start list-none gap-1">

      <NavigationMenuItem>
        <NavigationMenuLink asChild>
          <Link href="/" className="text-[25px] font-bold">TIMON</Link>
        </NavigationMenuLink>
      </NavigationMenuItem>

      <NavigationMenuItem>
        <NavigationMenuLink asChild>
          <Link href="/">Home</Link>
        </NavigationMenuLink>
      </NavigationMenuItem>

      <NavigationMenuItem>
        <NavigationMenuLink asChild>
          <Link href="/events">Events</Link>
        </NavigationMenuLink>
      </NavigationMenuItem>

      <NavigationMenuItem>
        <NavigationMenuLink asChild>
          <Link href="/teams">Teams</Link>
        </NavigationMenuLink>
      </NavigationMenuItem>

      <div className="grow" />
      
      {!user && (
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link href="/signin">Log in</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
      )}

      {user && (
        <>
          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link href="/profile">My profile</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link href="/logout">Log out</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        </>
      )}

    </NavigationMenu>
  )
}

export default NavBar;