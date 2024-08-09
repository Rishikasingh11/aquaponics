import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UserContext, UserContextType } from "@/contexts/UserContext";
import authService from "@/services/auth/auth.service";
import { useContext } from "react";
import { FaPowerOff } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";

export const UserNav = () => {
  // get and set current user from UserContext
  const { currentUser } = useContext(UserContext) as UserContextType;
  const { setCurrentUser } = useContext(UserContext) as UserContextType;

  // Navigate to routes, used in function calls
  const navigate = useNavigate();
  return (
    <>
      {currentUser ? (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar aria-label="Profile Dropdown">
              <AvatarImage
                src="https://github.com/shadcn.png"
                alt="Profile Picture"
              />
              <AvatarFallback>{currentUser.username}</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link
                to={`/${[...currentUser.roles]
                  .reverse()[0]
                  .toLowerCase()
                  .substring(5)}/${currentUser.username}`}
              >
                Dashboard
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>Billing</DropdownMenuItem>
            <DropdownMenuItem>Team</DropdownMenuItem>
            <DropdownMenuItem>
              <Button
                onClick={() => {
                  authService.signOut();
                  setCurrentUser(null);
                  navigate("/signin"); // Navigate to sign in page
                }}
                variant="destructive"
              >
                <FaPowerOff className="text-white mr-2" />
                Log Out
              </Button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Button variant={"default"} asChild>
          <Link to="/signup">Sign Up</Link>
        </Button>
      )}
    </>
  );
};
