import Image from "next/image";
import DashInfoItem from "../DashInfoItem";
import {
  BuildingStorefrontIcon,
  PencilSquareIcon,
  ShoppingBagIcon,
} from "@heroicons/react/24/solid";
import Link from "next/link";

const CompanyInfoCard = ({ index, companyInfo }) => {
  return (
    <section
      className="animate-slideInSpringedLeft flex flex-col md:flex-row p-2 lg:p-4 gap-2 items-center justify-between w-full rounded-2xl shadow-md bg-white"
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <div className="flex flex-col w-full text-left">
        <section className="flex gap-4 w-full items-center">
          {/*Edit Company Button*/}
          <Link href={"/dashboard/companies/edit/" + companyInfo.companyID}>
            <button className="flex items-center justify-center p-2 rounded-lg h-[4.2rem] w-[4.2rem] text-sm text-gray-500 bg-gray-50 hover:bg-gray-100 hover:shadow-md whitespace-nowrap transition-all">
              <PencilSquareIcon className="h-6 w-6" />
            </button>
          </Link>

          {/*Logo Div*/}
          <div className="rounded-lg overflow-clip aspect-square h-[4.2rem] shrink-0 relative shadow-inner border-[1px] border-tif-grey">
            <Image
              src={companyInfo.companyLogo}
              blurDataURL={companyInfo.companyLogo}
              alt="Company Logo"
              placeholder="blur"
              quality={100}
              fill
              style={{ objectFit: "cover" }}
            />
          </div>

          {/*Name Div & Address Dic*/}
          <div>
            <h1 className="font-semibold text-md">{companyInfo.companyName}</h1>
            <h2 className="font-medium text-sm text-gray-500 w-full text-ellipsis">
              {companyInfo.companyAddress}
            </h2>
          </div>
        </section>
      </div>

      {/*<div className="flex flex-col md:flex-row gap-1 lg:gap-2 items-center justify-center md:justify-end w-full md:w-fit">
        <DashInfoItem
          icon={<ShoppingBagIcon className="h-7 w-7 lg:h-8 lg:w-8" />}
          text="Products"
          page={"/dashboard/products?productCompany=" + companyInfo.companyID}
          count={companyInfo.productCount}
        />
      </div>*/}
      <div className="flex flex-col xl:flex-row gap-1 lg:gap-2 items-center justify-center lg:justify-center w-full md:w-fit">
        <DashInfoItem
          icon={<BuildingStorefrontIcon className="h-7 w-7 lg:h-8 lg:w-8" />}
          text="Outlets"
          page={"/dashboard/outlets?outletCompany=" + companyInfo.companyID}
          count={companyInfo.outletList.length}
          fitWidth={false}
        />
        <DashInfoItem
          icon={<ShoppingBagIcon className="h-7 w-7 lg:h-8 lg:w-8" />}
          text="Products"
          page={"/dashboard/products?productCompany=" + companyInfo.companyID}
          count={companyInfo.productCount}
          fitWidth={false}
        />
      </div>
    </section>
  );
};

export default CompanyInfoCard;
