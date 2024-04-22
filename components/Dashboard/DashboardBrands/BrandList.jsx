import BrandInfoCard from "./BrandInfoCard";

const BrandList = ({ listItems }) => {
  return (
    <div className="flex flex-col items-center w-full pb-10 gap-2">
      {listItems.map((brand) => (
        <BrandInfoCard key={brand.brandID} brandInfo={brand} />
      ))}
    </div>
  );
};

export default BrandList;
