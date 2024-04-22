const ReportsCompanySelector = ({ companies, selectedCompany, onChange }) => {
  return (
    <section className="flex shrink-0 justify-between md:justify-center items-center gap-4 h-10 w-full md:w-auto">
      <div className="relative font-semibold text-white h-full w-full">
        <select
          className="px-4 py-2 pr-12 rounded-lg bg-tif-blue hover:bg-tif-lavender hover:shadow-md h-full w-full transition-all"
          value={selectedCompany}
          onChange={(e) => {
            const value =
              e.target.value === "-1" ? -1 : parseInt(e.target.value);
            onChange(value);
          }}
        >
          <option value={-1} className="bg-white text-gray-500">
            All companies
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

export default ReportsCompanySelector;
