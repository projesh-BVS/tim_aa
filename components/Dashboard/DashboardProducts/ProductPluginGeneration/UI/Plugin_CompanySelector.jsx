const Plugin_CompanySelector = ({ companies, selectedCompany, onChange }) => {
  return (
    <section className="flex justify-between md:justify-center items-center gap-4 h-full w-full md:w-auto">
      <div className="relative font-medium text-sm text-white h-full w-full">
        <select
          className={`p-2 pr-4 rounded-md hover:shadow-md h-full w-full cursor-pointer transition-all ${
            selectedCompany == -1
              ? "bg-red-400 hover:bg-red-500"
              : "bg-tif-blue hover:bg-tif-lavender"
          }`}
          value={selectedCompany}
          onChange={(e) => {
            const value =
              e.target.value === "-1" ? -1 : parseInt(e.target.value);
            onChange(value);
          }}
        >
          <option value={-1} className="bg-white text-gray-500">
            Please Select Company
          </option>
          {companies.map((company) => (
            <option
              key={company.companyID}
              value={company.companyID}
              className="bg-white text-gray-500"
            >
              {company.companyName}
            </option>
          ))}
        </select>
      </div>
    </section>
  );
};

export default Plugin_CompanySelector;
