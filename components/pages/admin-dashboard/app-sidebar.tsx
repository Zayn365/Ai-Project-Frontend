"use client";
import { Calendar, Home, Receipt, Users } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { ToggleTheme } from "@/components/layout/toogle-theme";
import { logout } from "@/hooks/authHooks";
import { SheetFooter } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { useAppContext } from "@/context/AppContext";
import Link from "next/link";
import React from "react";

// Menu items.
const items = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "Dashboard",
    url: "/admin-dashboard",
    icon: Home,
  },
  {
    title: "Users",
    url: "/admin-dashboard/user-management",
    icon: Users,
  },
  {
    title: "Invoices",
    url: "#",
    icon: Receipt,
  },
];

export function AppSidebar() {
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);
  const { user } = useAppContext();
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Ai Generator</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <div>{item.title}</div>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SheetFooter className="flex-col sm:flex-col justify-start items-start">
          <Separator className="mb-2" />
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

          <ToggleTheme />
        </SheetFooter>
      </SidebarFooter>
    </Sidebar>
  );
}
