import { useState } from "react";
import {
  FaDribbble,
  FaFacebook,
  FaGithub,
  FaInstagram,
  FaTwitter,
} from "react-icons/fa6";
import Logo from "../logo/Logo";

const Footer = () => {
  const [currentYear] = useState(() => new Date().getFullYear());
  return (
    <footer className="bg-background dark:bg-background shadow-footer-shadow-light dark:shadow-footer-shadow-dark">
      <div className="mx-auto max-w-screen-xl space-y-8 px-4 py-16 sm:px-6 lg:space-y-16 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div>
            <Logo/>
            <p className="mt-4 max-w-xs text-secondary-foreground dark:text-secondary-foreground">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Esse non
              cupiditate quae nam molestias.
            </p>

            <ul className="mt-8 flex gap-6">
              <li>
                <a
                  href="#"
                  rel="noreferrer"
                  target="_blank"
                  className="text-secondary-foreground dark:text-secondary-foreground transition hover:opacity-75"
                >
                  <span className="sr-only">Facebook</span>
                  <FaFacebook className="h-6 w-6" />
                </a>
              </li>

              <li>
                <a
                  href="#"
                  rel="noreferrer"
                  target="_blank"
                  className="text-secondary-foreground dark:text-secondary-foreground transition hover:opacity-75"
                >
                  <span className="sr-only">Instagram</span>
                  <FaInstagram className="h-6 w-6" />
                </a>
              </li>

              <li>
                <a
                  href="#"
                  rel="noreferrer"
                  target="_blank"
                  className="text-secondary-foreground dark:text-secondary-foreground transition hover:opacity-75"
                >
                  <span className="sr-only">Twitter</span>
                  <FaTwitter className="h-6 w-6" />
                </a>
              </li>

              <li>
                <a
                  href="#"
                  rel="noreferrer"
                  target="_blank"
                  className="text-secondary-foreground dark:text-secondary-foreground transition hover:opacity-75"
                >
                  <span className="sr-only">GitHub</span>
                  <FaGithub className="h-6 w-6" />
                </a>
              </li>

              <li>
                <a
                  href="#"
                  rel="noreferrer"
                  target="_blank"
                  className="text-secondary-foreground dark:text-secondary-foreground transition hover:opacity-75"
                >
                  <span className="sr-only">Dribbble</span>
                  <FaDribbble className="h-6 w-6" />
                </a>
              </li>
            </ul>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:col-span-2 lg:grid-cols-4">
            <div>
              <p className="font-medium text-primary dark:text-primary">
                Services
              </p>

              <ul className="mt-6 space-y-4 text-sm">
                <li>
                  <a
                    href="#"
                    className="text-secondary-foreground dark:text-secondary-foreground transition hover:opacity-75"
                  >
                    {" "}
                    Event Management{" "}
                  </a>
                </li>

                <li>
                  <a
                    href="#"
                    className="text-secondary-foreground dark:text-secondary-foreground transition hover:opacity-75"
                  >
                    {" "}
                    Site Arrangement{" "}
                  </a>
                </li>

                <li>
                  <a
                    href="#"
                    className="text-secondary-foreground dark:text-secondary-foreground transition hover:opacity-75"
                  >
                    {" "}
                    Decoration{" "}
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <p className="font-medium text-primary dark:text-primary">
                Company
              </p>

              <ul className="mt-6 space-y-4 text-sm">
                <li>
                  <a
                    href="#"
                    className="text-secondary-foreground dark:text-secondary-foreground transition hover:opacity-75"
                  >
                    {" "}
                    About Us{" "}
                  </a>
                </li>

                <li>
                  <a
                    href="#"
                    className="text-secondary-foreground dark:text-secondary-foreground transition hover:opacity-75"
                  >
                    {" "}
                    Meet the Team{" "}
                  </a>
                </li>

                <li>
                  <a
                    href="#"
                    className="text-secondary-foreground dark:text-secondary-foreground transition hover:opacity-75"
                  >
                    {" "}
                    Career{" "}
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <p className="font-medium text-primary dark:text-primary">
                Helpful Links
              </p>

              <ul className="mt-6 space-y-4 text-sm">
                <li>
                  <a
                    href="#"
                    className="text-secondary-foreground dark:text-secondary-foreground transition hover:opacity-75"
                  >
                    {" "}
                    Contact{" "}
                  </a>
                </li>

                <li>
                  <a
                    href="#"
                    className="text-secondary-foreground dark:text-secondary-foreground transition hover:opacity-75"
                  >
                    {" "}
                    FAQs{" "}
                  </a>
                </li>

                <li>
                  <a
                    href="#"
                    className="text-secondary-foreground dark:text-secondary-foreground transition hover:opacity-75"
                  >
                    {" "}
                    Forum{" "}
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <p className="font-medium text-primary dark:text-primary">
                Legal
              </p>

              <ul className="mt-6 space-y-4 text-sm">
                <li>
                  <a
                    href="#"
                    className="text-secondary-foreground dark:text-secondary-foreground transition hover:opacity-75"
                  >
                    {" "}
                    Privacy Policy{" "}
                  </a>
                </li>

                <li>
                  <a
                    href="#"
                    className="text-secondary-foreground dark:text-secondary-foreground transition hover:opacity-75"
                  >
                    {" "}
                    Returns Policy{" "}
                  </a>
                </li>

                <li>
                  <a
                    href="#"
                    className="text-secondary-foreground dark:text-secondary-foreground transition hover:opacity-75"
                  >
                    {" "}
                    Refund Policy{" "}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <p className="text-xs text-foreground">
          &copy; {currentYear}. Aquaponics. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
