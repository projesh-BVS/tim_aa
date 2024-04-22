import {
  BuildingOffice2Icon,
  BuildingStorefrontIcon,
  ShoppingBagIcon,
} from "@heroicons/react/24/solid";
import DashInfoItem from "../../DashInfoItem";

const OwnerCollectionBody = ({ index, ownerData }) => {
  return (
    <section className="flex flex-col md:flex-row items-center justify-center gap-1 lg:gap-2 p-2 w-full">
      <DashInfoItem
        icon={<BuildingOffice2Icon className="h-7 w-7 lg:h-8 lg:w-8" />}
        text="Companies"
        page=""
        count={GetCompanyCount(ownerData)}
        fitWidth={false}
        showButton={false}
      />
      <DashInfoItem
        icon={<BuildingStorefrontIcon className="h-7 w-7 lg:h-8 lg:w-8" />}
        text="Outlets"
        page=""
        count={GetOutletCount(ownerData)}
        fitWidth={false}
        showButton={false}
      />
      <DashInfoItem
        icon={<ShoppingBagIcon className="h-7 w-7 lg:h-8 lg:w-8" />}
        text="Products"
        page=""
        count={GetProductCount(ownerData)}
        fitWidth={false}
        showButton={false}
      />
    </section>
  );
};

export default OwnerCollectionBody;

function GetCompanyCount(ownerData) {
  return ownerData.companyList.length;
}

function GetOutletCount(ownerData) {
  var oCount = 0;
  ownerData.companyList.map((company) => (oCount += company.outletList.length));

  return oCount;
}

function GetProductCount(ownerData) {
  var pCount = 0;
  ownerData.companyList.map((company) => (pCount += company.productCount));

  return pCount;
}
