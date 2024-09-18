const Plugin_ProductSelector = ({
  products,
  selectedProduct,
  selectedCompany,
  onChange,
}) => {
  return (
    <section className="flex justify-between md:justify-center items-center gap-4 h-full w-full md:w-auto md:max-w-[15rem]">
      <div className="relative font-medium text-sm text-white h-full w-full">
        <select
          className={`p-2 pr-4 rounded-md hover:shadow-md h-full w-full cursor-pointer transition-all ${
            selectedProduct == "-1"
              ? "bg-red-400 hover:bg-red-500"
              : "bg-tif-blue hover:bg-tif-lavender"
          }`}
          value={selectedProduct}
          onChange={(e) => {
            const value = e.target.value === "-1" ? "-1" : e.target.value;
            onChange(value);
          }}
        >
          <option key={"-1"} value={"-1"} className="bg-white text-gray-500">
            Please Select Product
          </option>
          {products
            .filter((product) => product.companyID == selectedCompany)
            .map((product) => (
              <option
                key={product.productID}
                value={product.productSKU}
                className="bg-white text-gray-500"
              >
                {product.productName}
              </option>
            ))}
        </select>
      </div>
    </section>
  );
};

export default Plugin_ProductSelector;
