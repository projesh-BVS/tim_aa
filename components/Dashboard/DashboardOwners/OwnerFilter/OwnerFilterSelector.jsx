import { ChevronDownIcon } from "@heroicons/react/24/solid";

export const OwnerCompanySelector = ({
  companies,
  selectedCompany,
  callback_OnChange,
}) => {
  return (
    <section className="flex shrink-0 justify-between md:justify-center items-center gap-4 h-10 w-full md:w-auto">
      <div className="relative font-semibold text-white h-full w-full">
        <select
          className="px-4 py-2 pr-12 rounded-lg bg-tif-blue hover:bg-tif-lavender hover:shadow-md h-full w-full transition-all"
          value={selectedCompany}
          onChange={(e) => {
            const value =
              e.target.value === "-1" ? -1 : parseInt(e.target.value);
            callback_OnChange(value);
          }}
        >
          <option value={-1} className="bg-white text-gray-500">
            All Companies
          </option>

          {companies.map((company) => (
            <option
              key={"CompanySelectorOption" + company.companyID}
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

export const OwnerOutletSelector = ({
  outlets,
  selectedOutlet,
  callback_OnChange,
}) => {
  return (
    <section className="flex shrink-0 justify-between md:justify-center items-center gap-4 h-10 w-full md:w-auto">
      <div className="relative font-semibold text-white h-full w-full">
        {!outlets && (
          <div className="flex items-center justify-between pl-4 py-2 rounded-lg bg-tif-blue/40 pointer-events-none">
            <h1 className="pr-12">All Outlets</h1>
            <ChevronDownIcon className="w-4 h-4" />
          </div>
        )}
        {outlets && (
          <select
            className="px-4 py-2 pr-12 rounded-lg bg-tif-blue hover:bg-tif-lavender hover:shadow-md h-full w-full transition-all"
            value={selectedOutlet}
            onChange={(e) => {
              const value =
                e.target.value === "-1" ? -1 : parseInt(e.target.value);
              callback_OnChange(value);
            }}
          >
            <option value={-1} className="bg-white text-gray-500">
              All Outlets
            </option>

            {outlets.map((outlet) => (
              <option
                key={"OutletSelectorOption" + outlet.outletID}
                value={outlet.outletID}
                className="bg-white text-gray-500"
              >
                {outlet.outletName}
              </option>
            ))}
          </select>
        )}
      </div>
    </section>
  );
};
