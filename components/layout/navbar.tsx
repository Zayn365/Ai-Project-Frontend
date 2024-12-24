"use client";
import { ChevronsDown, Github, Menu } from "lucide-react";
import React from "react";
import { useRouter } from "next/navigation";
import { useAppContext } from "@/context/AppContext";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Separator } from "../ui/separator";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "../ui/navigation-menu";
import { Button } from "../ui/button";
import Link from "next/link";
import Image from "next/image";
import { ToggleTheme } from "./toogle-theme";
import { logout } from "@/hooks/authHooks";

interface RouteProps {
  href: string;
  label: string;
  list: any[] | null;
}
interface RouteDropDownProps {
  href: string;
  label: string;
}

interface FeatureProps {
  title: string;
  description: string;
}

const routeList: RouteProps[] = [
  {
    href: "",
    label: "Create",
    list: [
      // {
      //   href: "/text-to-speech",
      //   label: "Text-To-Speech",
      // },
      {
        href: "/blog",
        label: "Blog",
      },
      {
        href: "/ebook",
        label: "Ebook",
      },
      {
        href: "/music",
        label: "Music",
      },
      // {
      //   href: "/imageAi",
      //   label: "Image Generate",
      // },
      {
        href: "/storytelling",
        label: "Storytelling",
      },
    ],
  },
  {
    href: "#contact",
    label: "Contact",
    list: null,
  },
  {
    href: "#faq",
    label: "FAQ",
    list: null,
  },
];

const featureList: FeatureProps[] = [
  {
    title: "Showcase Your Value ",
    description: "Highlight how your product solves user problems.",
  },
  {
    title: "Build Trust",
    description:
      "Leverages social proof elements to establish trust and credibility.",
  },
  {
    title: "Capture Leads",
    description:
      "Make your lead capture form visually appealing and strategically.",
  },
];

export const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);
  const [isAiOpen, setIsAiOpen] = React.useState(false);
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
  const { user } = useAppContext();
  const route = useRouter();

  return (
    <header className="shadow-inner bg-opacity-15 w-[90%] md:w-[70%] lg:w-[75%] lg:max-w-screen-xl top-5 mx-auto sticky border border-secondary z-40 rounded-2xl flex justify-between items-center p-2 bg-card">
      <Link href="/" className="font-bold text-lg flex items-center">
        <ChevronsDown className="bg-gradient-to-tr border-secondary from-primary via-primary/70 to-primary rounded-lg w-9 h-9 mr-2 border text-white" />
        Ai generator
      </Link>
      {/* <!-- Mobile --> */}
      <div className="flex items-center lg:hidden">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Menu
              onClick={() => setIsOpen(!isOpen)}
              className="cursor-pointer lg:hidden"
            />
          </SheetTrigger>

          <SheetContent
            side="left"
            className="flex flex-col justify-between rounded-tr-2xl rounded-br-2xl bg-card border-secondary"
          >
            <div>
              <SheetHeader className="mb-4 ml-4">
                <SheetTitle className="flex items-center">
                  <Link href="/" className="flex items-center">
                    <ChevronsDown className="bg-gradient-to-tr border-secondary from-primary via-primary/70 to-primary rounded-lg w-9 h-9 mr-2 border text-white" />
                    Ai generator
                  </Link>
                </SheetTitle>
              </SheetHeader>

              <div className="flex flex-col gap-2">
                {routeList.map(({ href, label, list }) => (
                  <>
                    <Button
                      key={href}
                      onClick={() => {
                        list && list?.length > 0
                          ? setIsAiOpen(!isAiOpen)
                          : setIsOpen(false);
                      }}
                      asChild
                      variant="ghost"
                      onBlur={() => setTimeout(() => setIsAiOpen(false), 100)}
                      className="justify-start text-base"
                    >
                      <Link href={href}>
                        {label}{" "}
                        {list && list?.length > 0 ? (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="2"
                            stroke="currentColor"
                            className="w-5 h-5"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                        ) : (
                          ""
                        )}
                      </Link>
                    </Button>
                    {isAiOpen
                      ? list && (
                          <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-[#2e2e2e] shadow-lg rounded-md py-1 z-50">
                            {list.map((val, key) => (
                              <Link
                                key={key}
                                href={val.href}
                                className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-[#ea580c]"
                              >
                                {val.label}
                              </Link>
                            ))}
                          </div>
                        )
                      : ""}
                  </>
                ))}
              </div>
            </div>

            <SheetFooter className="flex-col sm:flex-col justify-start items-start">
              <Separator className="mb-2" />
              {user ? (
                <>
                  <button
                    onClick={toggleDropdown}
                    onBlur={() =>
                      setTimeout(() => setIsDropdownOpen(false), 100)
                    }
                    className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-[#2e2e2e] rounded-md"
                  >
                    <span>{user?.username}</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                  {isDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-[#2e2e2e] shadow-lg rounded-md py-1 z-50">
                      <Link
                        href="/profile"
                        className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-[#ea580c]"
                      >
                        Profile
                      </Link>
                      <button
                        onClick={() => {
                          logout();
                        }}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-[#ea580c]"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <Button
                  size="sm"
                  onClick={() => {
                    route.push("/signin");
                    setIsOpen(false);
                  }}
                  variant="ghost"
                  className="w-full mb-2 justify-start"
                >
                  <div className="flex gap-2">
                    <span className="block lg:hidden">
                      <Link href="/signin">SignIn</Link>
                    </span>
                  </div>
                </Button>
              )}

              <ToggleTheme />
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>

      {/* <!-- Desktop --> */}
      <NavigationMenu className="hidden lg:block mx-auto">
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger className="bg-card text-base">
              Features
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <div className="grid w-[600px] grid-cols-2 gap-5 p-4">
                <Image
                  src="https://avatars.githubusercontent.com/u/75042455?v=4"
                  alt="RadixLogo"
                  className="h-full w-full rounded-md object-cover"
                  width={600}
                  height={600}
                />
                <ul className="flex flex-col gap-2">
                  {featureList.map(({ title, description }) => (
                    <li
                      key={title}
                      className="rounded-md p-3 text-sm hover:bg-muted"
                    >
                      <p className="mb-1 font-semibold leading-none text-foreground">
                        {title}
                      </p>
                      <p className="line-clamp-2 text-muted-foreground">
                        {description}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>

          <NavigationMenuItem>
            {routeList.map(({ href, label, list }) => (
              <>
                <Button
                  key={href}
                  onClick={() => {
                    list && list?.length > 0
                      ? setIsAiOpen(!isAiOpen)
                      : setIsOpen(false);
                  }}
                  asChild
                  variant="ghost"
                  onBlur={() => setTimeout(() => setIsAiOpen(false), 300)}
                  className="justify-start text-center align-middle"
                >
                  <Link href={href}>
                    {label}{" "}
                    {list && list?.length > 0 ? (
                      <>
                        {" "}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="2"
                          stroke="currentColor"
                          className="w-3 h-3"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </>
                    ) : (
                      ""
                    )}
                  </Link>
                </Button>
                {isAiOpen
                  ? list && (
                      <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-[#2e2e2e] shadow-lg rounded-md py-1 z-50">
                        {list.map((val, key) => (
                          <Link
                            key={key}
                            href={val.href}
                            className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-[#ea580c]"
                          >
                            {val.label}
                          </Link>
                        ))}
                      </div>
                    )
                  : ""}
              </>
            ))}
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

      <div className="hidden lg:flex">
        <ToggleTheme />

        {/* <Button asChild size="sm" variant="ghost" aria-label="View on GitHub">
          <Link
            aria-label="View on GitHub"
            href="#"
            target="_blank"
          >
            <Github className="size-5" />
          </Link>
        </Button> */}
        {user ? (
          <>
            <button
              onClick={toggleDropdown}
              onBlur={() => setTimeout(() => setIsDropdownOpen(false), 100)}
              className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-[#2e2e2e] rounded-md"
            >
              <span>{user?.username}</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-10 w-48 bg-white dark:bg-[#2e2e2e] shadow-lg rounded-md py-1 z-50">
                <Link
                  href="/profile"
                  className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-[#ea580c]"
                >
                  Profile
                </Link>
                <button
                  onClick={() => {
                    logout();
                  }}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-[#ea580c]"
                >
                  Logout
                </button>
              </div>
            )}
          </>
        ) : (
          <Button
            asChild
            size="sm"
            variant="outline"
            aria-label="View on GitHub"
          >
            <Link href="/signin">SignIn</Link>
          </Button>
        )}
      </div>
    </header>
  );
};
