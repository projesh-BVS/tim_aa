import DashHeader from "@/components/Dashboard/DashboardHeader/DashHeader";
import DashSidebar, {
  DashSidebarItem,
} from "@/components/Dashboard/DashSidebar";
import {
  BuildingOffice2Icon,
  BuildingStorefrontIcon,
  HomeIcon,
  PresentationChartLineIcon,
  ShoppingBagIcon,
  UserGroupIcon,
} from "@heroicons/react/24/solid";

export const metadata = {
  title: "TIM Dashboard",
  description: "Administrator dashboard for Try It Mirror",
};

export default function DashboardLayout({ children }) {
  return (
    <main className="flex w-screen h-screen">
      <section className="hidden lg:flex z-20">
        <DashSidebar>
          <DashSidebarItem
            icon={<HomeIcon className="h-6 w-6" />}
            text={"Home"}
            page="/dashboard"
          />
          <DashSidebarItem
            icon={<UserGroupIcon className="h-6 w-6" />}
            text={"Owners"}
            page="/dashboard/owners"
            isSuperOnly={true}
          />
          <DashSidebarItem
            icon={<BuildingOffice2Icon className="h-6 w-6" />}
            text={"Companies"}
            page="/dashboard/companies"
            isAdminOnly={true}
          />
          <DashSidebarItem
            icon={<BuildingStorefrontIcon className="h-6 w-6" />}
            text={"Outlets"}
            page="/dashboard/outlets"
            isAdminOnly={true}
          />
          <DashSidebarItem
            icon={<ShoppingBagIcon className="h-6 w-6" />}
            text={"Products"}
            page="/dashboard/products"
            isAdminOnly={true}
          />
          <DashSidebarItem
            icon={<PresentationChartLineIcon className="h-6 w-6" />}
            text={"Reports"}
            page="/dashboard/reports"
            isAdminOnly={true}
          />
        </DashSidebar>
      </section>
      <section className="flex flex-col w-full h-full overflow-hidden">
        <DashHeader />
        {children}
      </section>
    </main>
  );
}
