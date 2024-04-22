import Image from "next/image";
import DashInfoItem from "../../DashInfoItem";
import { ShoppingBagIcon } from "@heroicons/react/24/solid";

const OutletCollectionHeader = ({ companyInfo }) => {
  return (
    <section className="flex flex-col md:flex-row p-2 gap-2 items-center justify-between w-full border-b-2 border-tif-blue">
      <div className="flex flex-col w-full text-left">
        <section className="flex gap-4 w-full items-center">
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

      <div className="flex flex-col md:flex-row gap-1 lg:gap-2 items-center justify-center md:justify-end w-full md:w-fit">
        <DashInfoItem
          icon={<ShoppingBagIcon className="h-7 w-7 lg:h-8 lg:w-8" />}
          text="Products"
          page={"/dashboard/products?productCompany=" + companyInfo.companyID}
          count={companyInfo.productCount}
        />
      </div>
    </section>
  );
};

export default OutletCollectionHeader;
