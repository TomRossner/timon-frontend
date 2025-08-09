import Link from "next/link";
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink } from "./ui/navigation-menu";

const NavBar = () => {
  return (
    <NavigationMenu className="flex max-w-full justify-start list-none">

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
      
      <NavigationMenuItem>
        <NavigationMenuLink asChild>
          <Link href="/signin">Log in</Link>
        </NavigationMenuLink>
      </NavigationMenuItem>

    </NavigationMenu>
  )
}

export default NavBar;