"use client";

import { createContext, useContext, useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bars3Icon, RectangleGroupIcon } from "@heroicons/react/24/solid";
import { useSession } from "next-auth/react";
import LoadingIndicator from "../Common/LoadingIndicator";

const DashSidebarContext = createContext();

const DashSidebar = ({ children }) => {
  const { data: session, status: sessionStatus } = useSession({
    required: true,
  });

  const [isCollapsed, setCollapsed] = useState(false);
  const [currRole, setCurrRole] = useState(null);

  const handleCollapse = () => {
    setCollapsed(!isCollapsed);
  };

  useEffect(() => {
    if (session?.user?.role) {
      setCurrRole(session.user.role);
    }
  }, [session]);

  return (
    <aside className="h-screen">
      {!session && (
        <div
          className={`flex items-center justify-center p-4 ${
            isCollapsed ? "w-0" : "w-40"
          }`}
        >
          <LoadingIndicator mini={false} margin={false} />
        </div>
      )}
      {session && (
        <nav className="flex flex-col h-full bg-white border-r">
          <div className="flex p-4 pb-2 justify-between items-center">
            <div
              className={`flex items-center justify-start gap-2 leading-none overflow-hidden transition-all ${
                isCollapsed ? "w-0" : "w-40"
              }`}
            >
              <div className="p-2 text-white bg-gradient-to-br from-tif-blue to-tif-pink rounded-md">
                <RectangleGroupIcon className="w-6 h-6" />
              </div>
              <div className="flex flex-col w-full">
                <h2 className="font-medium text-base text-tif-lavender">
                  {session.user.role == "admin" ? "Owner" : "Admin"}
                </h2>
                <h1 className="font-semibold text-md text-tif-lavender whitespace-nowrap">
                  Dashboard
                </h1>
              </div>
            </div>
            <button
              onClick={handleCollapse}
              className="p-1.5 rounded-lg bg-gray-100 hover:bg-gray-200"
            >
              <Bars3Icon
                className={`${
                  isCollapsed ? "rotate-0" : "rotate-180"
                } h-6 w-6 transition-all duration-300`}
              />
            </button>
          </div>
          <DashSidebarContext.Provider value={{ isCollapsed, currRole }}>
            <ul className="flex-1 px-3">{children}</ul>
          </DashSidebarContext.Provider>
        </nav>
      )}
    </aside>
  );
};

export default DashSidebar;

export function DashSidebarItem({
  icon,
  text,
  page,
  alert,
  isSuperOnly = false,
  isAdminOnly = false,
}) {
  const { isCollapsed } = useContext(DashSidebarContext);
  const { currRole } = useContext(DashSidebarContext);
  const pathname = usePathname();
  const active = pathname === page ? true : false;

  if (!currRole) {
    return (
      <div className="flex items-center justify-center py-2 px-3 my-1">
        <LoadingIndicator />
      </div>
    );
  }

  if (currRole) {
    if (isSuperOnly && currRole != "superAdmin") return null;
    if (isAdminOnly && currRole != "admin") return null;

    return (
      <li
        className={`relative flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors group ${
          active
            ? "bg-gradient-to-r from-tif-blue to-tif-lavender text-white"
            : "hover:bg-indigo-50 text-gray-600"
        }`}
      >
        <Link href={page} className="flex">
          {icon}
          <span
            className={`overflow-hidden transition-all ${
              isCollapsed ? "w-0" : "w-40 ml-3"
            }`}
          >
            {text}
          </span>
          {alert && (
            <div
              className={`absolute right-2 w-2 h-2 rounded bg-indigo-400 ${
                isCollapsed ? "top-2" : ""
              }`}
            />
          )}

          {isCollapsed && (
            <div
              className={`
          absolute left-full rounded-md px-2 py-1 ml-6
          bg-gradient-to-br from-tif-blue to-tif-pink text-white text-sm shadow-md
          invisible opacity-20 -translate-x-3 transition-all
          group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
          `}
            >
              {text}
            </div>
          )}
        </Link>
      </li>
    );
  }
}
