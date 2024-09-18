import { ChevronDownIcon } from "@heroicons/react/24/solid";

const ProductCategorySelector = ({
  categories,
  selectedCategory,
  callback_OnChange,
}) => {
  return (
    <section className="flex shrink-0 justify-between md:justify-center items-center gap-4 h-10 w-full md:w-auto">
      <div className="relative font-semibold text-white h-full w-full">
        {!categories && (
          <div className="flex items-center justify-between pl-4 py-2 rounded-lg bg-tif-blue/40 pointer-events-none">
            <h1 className="pr-12">All Categories</h1>
            <ChevronDownIcon className="w-4 h-4" />
          </div>
        )}
        {categories && (
          <select
            className="px-4 py-2 pr-12 rounded-lg bg-tif-blue hover:bg-tif-lavender hover:shadow-md h-full w-full transition-all"
            value={selectedCategory}
            onChange={(e) => {
              const value = e.target.value === "-1" ? "-1" : e.target.value;
              callback_OnChange(value);
            }}
          >
            <option value={-1} className="bg-white text-gray-500">
              All Categories
            </option>

            {categories.map((category, index) => (
              <option
                key={"CategorySelectorOption" + index}
                value={category}
                className="bg-white text-gray-500"
              >
                {category}
              </option>
            ))}
          </select>
        )}
      </div>
    </section>
  );
};

export default ProductCategorySelector;
