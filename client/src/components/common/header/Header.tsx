import { Link } from "react-router-dom";
import { useState} from "react";
import { FaX, FaBars} from "react-icons/fa6";
import { ModeToggle } from "../../mode-toggle";
import Logo from "../logo/Logo";
import { UserNav } from "./components/UserNav";

const Header = () => {
  // Mobile menu open/close state
  const [open, setOpen] = useState(false);

  return (
    <nav className="shadow-header-shadow-light dark:shadow-header-shadow-dark">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <button
              onClick={() => setOpen(!open)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white dark:hover:text-gray-800 hover:bg-primary focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-label="Mobile Menu"
            >
              {open ? (
                <FaX className="block h-6 w-6" />
              ) : (
                <FaBars className="block h-6 w-6" />
              )}
            </button>
          </div>
          <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex items-center justify-center text-primary dark:text-primary">
              <Logo />
            </div>
            <div className="hidden sm:block sm:mr-auto sm:ml-auto">
              <div className="flex space-x-4">
                <Link
                  to="/events"
                  className="dark:text-gray-100 text-gray-800 hover:bg-primary hover:text-white dark:hover:text-gray-800 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Events
                </Link>
                <a
                  href="#"
                  className="dark:text-gray-100 text-gray-800 hover:bg-primary hover:text-white dark:hover:text-gray-800 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Team
                </a>
                <a
                  href="#"
                  className="dark:text-gray-100 text-gray-800 hover:bg-primary hover:text-white dark:hover:text-gray-800 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Projects
                </a>
                <a
                  href="#"
                  className="dark:text-gray-100 text-gray-800 hover:bg-primary hover:text-white dark:hover:text-gray-800 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Calendar
                </a>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <ModeToggle />
            <UserNav/>
          </div>
        </div>
      </div>
      <div className={`${open ? "block" : "hidden"} sm:hidden`}>
        <div className="px-2 pt-2 pb-3 space-y-1">
          <Link
            to="/events"
            className="bg-gray-800 text-white block px-3 py-2 rounded-md text-base font-medium"
          >
            Events
          </Link>
          <a
            href="#"
            className="dark:text-gray-100 text-gray-800 hover:bg-primary hover:text-white dark:hover:text-gray-800 block px-3 py-2 rounded-md text-base font-medium"
          >
            Team
          </a>
          <a
            href="#"
            className="dark:text-gray-100 text-gray-800 hover:bg-primary hover:text-white dark:hover:text-gray-800 block px-3 py-2 rounded-md text-base font-medium"
          >
            Projects
          </a>
          <a
            href="#"
            className="dark:text-gray-100 text-gray-800 hover:bg-primary hover:text-white dark:hover:text-gray-800 block px-3 py-2 rounded-md text-base font-medium"
          >
            Calendar
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Header;
