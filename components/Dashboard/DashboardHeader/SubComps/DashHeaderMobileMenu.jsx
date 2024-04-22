import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import {
  Bars3Icon,
  BuildingOffice2Icon,
  BuildingStorefrontIcon,
  HomeIcon,
  PresentationChartLineIcon,
  RectangleGroupIcon,
  ShoppingBagIcon,
  UserGroupIcon,
} from "@heroicons/react/24/solid";
import { usePathname } from "next/navigation";
import Link from "next/link";

const DashHeaderMobileMenu = ({ Role }) => {
  const currentPath = usePathname();

  const menuLinks = [
    {
      href: "/dashboard",
      label: "Home",
      icon: <HomeIcon className="shrink-0 h-5 w-5" />,
      isSuperOnly: false,
      isAdminOnly: false,
    },
    {
      href: "/dashboard/owners",
      label: "Owners",
      icon: <UserGroupIcon className="shrink-0 h-5 w-5" />,
      isSuperOnly: true,
      isAdminOnly: false,
    },
    {
      href: "/dashboard/companies",
      label: "Companies",
      icon: <BuildingOffice2Icon className="shrink-0 h-5 w-5" />,
      isSuperOnly: false,
      isAdminOnly: true,
    },
    {
      href: "/dashboard/outlets",
      label: "Outlets",
      icon: <BuildingStorefrontIcon className="shrink-0 h-5 w-5" />,
      isSuperOnly: false,
      isAdminOnly: true,
    },
    {
      href: "/dashboard/products",
      label: "Products",
      icon: <ShoppingBagIcon className="shrink-0 h-5 w-5" />,
      isSuperOnly: false,
      isAdminOnly: true,
    },
    {
      href: "/dashboard/reports",
      label: "Reports",
      icon: <PresentationChartLineIcon className="shrink-0 h-5 w-5" />,
      isSuperOnly: false,
      isAdminOnly: true,
    },
  ];

  const roleFilteredMenuLinks = menuLinks.filter(roleCheck);

  function roleCheck(menuLink) {
    if (menuLink.isSuperOnly) {
      if (Role == "superAdmin") return menuLink;
    } else if (menuLink.isAdminOnly) {
      if (Role == "admin") return menuLink;
    } else return menuLink;
  }

  return (
    <div className="flex items-center justify-center">
      <Menu as="div" className="relative inline-block">
        <div className="flex items-center justify-center">
          <Menu.Button className="inline-flex items-center justify-center w-10 h-10 overflow-hidden rounded-lg bg-gray-100 hover:bg-gray-200 transition-all">
            <Bars3Icon className="h-6 w-6" />
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95 -translate-x-5 -translate-y-5"
          enterTo="transform opacity-100 scale-100 translate-x-0 translate-y-0"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100 translate-x-0 translate-y-0"
          leaveTo="transform opacity-0 scale-95 -translate-x-5 -translate-y-5"
        >
          <Menu.Items className="absolute left-0 mt-6 min-w-[14rem] max-w-[97vw] origin-top-right divide-y divide-gray-100 rounded-lg bg-white shadow-lg ring-1 ring-black/5 focus:outline-none overflow-clip">
            <div className="flex items-center justify-start p-2 gap-4 text-white bg-gradient-to-br from-tif-blue to-tif-pink">
              <RectangleGroupIcon className="w-8 h-8" />
              <h1 className="font-medium">Owner Dashboard</h1>
            </div>
            {roleFilteredMenuLinks.map((linkData) => (
              <div key={linkData.href} className="px-1 py-1">
                <Menu.Item
                  as={currentPath === linkData.href ? "div" : Link}
                  href={linkData.href}
                  className={`flex w-full p-2 gap-2 items-center text-sm rounded-md transition-all ${
                    currentPath === linkData.href
                      ? "bg-tif-blue text-white pointer-events-none"
                      : "bg-white hover:bg-indigo-50 text-gray-600"
                  }`}
                >
                  {linkData.icon}
                  {linkData.label}
                </Menu.Item>
              </div>
            ))}
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
};

export default DashHeaderMobileMenu;
