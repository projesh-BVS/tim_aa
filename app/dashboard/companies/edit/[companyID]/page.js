"use client";
import LoadingIndicator from "@/components/Common/LoadingIndicator";
import DashPageHeader from "@/components/Dashboard/DashPageHeader";
import CompanyEditNotifyModal from "@/components/Dashboard/DashboardCompanies/CompanyModification/CompanyEditNotifyModal";
import CompanyUploadCard_About from "@/components/Dashboard/DashboardCompanies/CompanyUploadCard_About";
import CompanyUploadCard_Categories from "@/components/Dashboard/DashboardCompanies/CompanyUploadCard_Categories";
import useCompany from "@/hooks/useCompany";
import {
  GetCompanyChangeMsg_Cat_Add,
  GetCompanyChangeMsg_Cat_Delete,
  GetCompanyChangeMsg_Cat_Edit,
  GetCompanyChangeMsg_Info_Update,
  GetCompanyChangeMsg_InfoURL_Failed,
} from "@/libs/Company Libs/CompanyChangeMsgs";
import {
  CloudArrowUpIcon,
  PencilSquareIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const EditCompany = ({ params }) => {
  const {
    company,
    companyMutate,
    isCompanyLoading,
    isCompanyError,
    isCompanyValidating,
  } = useCompany(params.companyID);

  const router = useRouter();
  const [isUploadingData, setIsUploadingData] = useState(false);
  const [isFormFilled, setIsFormFilled] = useState(false);
  const [showStatusNotification, setShowStatusNotification] = useState(false);
  const [statusNotificationContent, setStatusNotificationContent] =
    useState(null);
  const [fields, setFields] = useState({
    companyID: "",
    companyURL: "",
    companyLogo: "",
    companyName: "",
    companyAddress: "",
    categories: "",
  });

  useEffect(() => {
    if (company) {
      console.log(
        "Setting Company Data: " + JSON.stringify(company.company[0])
      );
      SetCompanyData(company.company[0]);
    }
  }, [company]);

  useEffect(() => {
    setIsFormFilled(isFormValid());
  }, [fields]);

  function SetCompanyData(company) {
    setFields(JSON.parse(JSON.stringify(company)));
  }

  const isFormValid = () => {
    return Object.values(fields).every((value) => value || value === 0);
  };

  const HandleFieldValueChange = (e) => {
    const { name, value } = e.target;
    setFields({ ...fields, [name]: value });
  };

  const HandleFileValueChange = (e) => {
    const { name, value } = e.target;
    setFields({ ...fields, [name]: value });
  };

  const HandleSubmit_Edit = async (event) => {
    console.log(
      "Initiating submitting company edit | " + JSON.stringify(fields)
    );

    event.preventDefault();
    if (isFormValid()) {
      setIsUploadingData(true);

      try {
        const response = await axios.patch(
          "https://f2zxw8fu5k.execute-api.ap-south-1.amazonaws.com/TryItMirror/company",
          fields
        );

        if (response.status === 200) {
          console.log(
            "Company Update Successful | Response: " + JSON.stringify(response)
          );
          setStatusNotificationContent(GetCompanyChangeMsg_Info_Update(true));
        } else {
          console.log(
            "Company Update Failed | Response: " + JSON.stringify(response)
          );
          setStatusNotificationContent(GetCompanyChangeMsg_Info_Update(false));
        }
      } catch (err) {
        console.log("Company Update Failed | Error: " + JSON.stringify(err));
        console.log(err.response.status);
        if(err.response.status == 409) setStatusNotificationContent(GetCompanyChangeMsg_InfoURL_Failed());
        else setStatusNotificationContent(GetCompanyChangeMsg_Info_Update(false));
      }
      setIsUploadingData(false);
      setShowStatusNotification(true);
    }
  };

  const HandleSubmit_Category_Add = async (addCat) => {
    let apiData = {
      companyID: fields.companyID,
      newCat: addCat,
    };

    console.log(
      "Initiaing submitting category only add | " + JSON.stringify(apiData)
    );

    setIsUploadingData(true);

    try {
      const response = await axios.post(
        "https://f2zxw8fu5k.execute-api.ap-south-1.amazonaws.com/TryItMirror/category",
        apiData
      );

      if (response.status === 200) {
        console.log(
          "Category Only Add Successful | Response: " + JSON.stringify(response)
        );
        setStatusNotificationContent(
          GetCompanyChangeMsg_Cat_Add(true, apiData.newCat)
        );
        //companyMutate();
      } else {
        console.log(
          "Category Only Add Failed | Response: " + JSON.stringify(response)
        );
        setStatusNotificationContent(
          GetCompanyChangeMsg_Cat_Add(false, apiData.newCat)
        );
      }
    } catch (err) {
      console.log(
        "Category Only Add Failed in catch | Error: " + JSON.stringify(err)
      );
      setStatusNotificationContent(
        GetCompanyChangeMsg_Cat_Add(false, apiData.newCat)
      );
    }
    setIsUploadingData(false);
    setShowStatusNotification(true);
  };

  const HandleSubmit_Category_Edit = async (catData) => {
    let apiData = {
      companyID: fields.companyID,
      oldCat: catData.oldCat,
      newCat: catData.newCat,
    };

    console.log(
      "Initiating submitting category only edit | " + JSON.stringify(apiData)
    );

    setIsUploadingData(true);

    try {
      const response = await axios.patch(
        "https://f2zxw8fu5k.execute-api.ap-south-1.amazonaws.com/TryItMirror/category",
        apiData
      );

      if (response.status === 200) {
        console.log(
          "Category Only Update Successful | Response: " +
            JSON.stringify(response)
        );
        setStatusNotificationContent(
          GetCompanyChangeMsg_Cat_Edit(true, apiData.oldCat, apiData.newCat)
        );
      } else {
        console.log(
          "Category Only Update Failed | Response: " + JSON.stringify(response)
        );
        setStatusNotificationContent(
          GetCompanyChangeMsg_Cat_Edit(false, apiData.oldCat, apiData.newCat)
        );
      }
    } catch (err) {
      console.log(
        "Category Only Update Failed in catch | Error: " + JSON.stringify(err)
      );
      setStatusNotificationContent(
        GetCompanyChangeMsg_Cat_Edit(false, apiData.oldCat, apiData.newCat)
      );
    }
    setIsUploadingData(false);
    setShowStatusNotification(true);
  };

  const HandleSubmit_Category_Delete = async (deleteCat) => {
    let apiData = {
      companyID: fields.companyID,
      cat: deleteCat,
    };

    console.log(
      "Initiaing submitting category only delete | " + JSON.stringify(apiData)
    );

    setIsUploadingData(true);

    try {
      const response = await axios.delete(
        "https://f2zxw8fu5k.execute-api.ap-south-1.amazonaws.com/TryItMirror/category",
        { data: apiData }
      );

      if (response.status === 200) {
        console.log(
          "Category Only Delete Successful | Response: " +
            JSON.stringify(response)
        );
        setStatusNotificationContent(
          GetCompanyChangeMsg_Cat_Delete(true, apiData.cat, "NONE")
        );
        //companyMutate();
      } else if (response.status === 204) {
        console.log(
          "Cannot Delete Category, Items exist | Response: " +
            JSON.stringify(response)
        );
        setStatusNotificationContent(
          GetCompanyChangeMsg_Cat_Delete(false, apiData.cat, "PRODUCT")
        );
      } else {
        console.log(
          "Category Only Delete Failed | Response: " + JSON.stringify(response)
        );
        setStatusNotificationContent(
          GetCompanyChangeMsg_Cat_Delete(false, apiData.cat, "API")
        );
      }
    } catch (err) {
      console.log(
        "Category Only Delete Failed in catch | Error: " + JSON.stringify(err)
      );
      setStatusNotificationContent(
        GetCompanyChangeMsg_Cat_Delete(false, apiData.cat, "API")
      );
    }
    setIsUploadingData(false);
    setShowStatusNotification(true);
  };

  return (
    <main className="flex flex-col gap-6 items-center w-full h-full overflow-auto bg-tif-grey">
      <DashPageHeader
        icon={<PencilSquareIcon className="h-8 w-8" />}
        text={"Editing Company -" + params.companyID}
        isLoading={isCompanyLoading}
        showBackBtn={false}
      />

      {isCompanyLoading && (
        <section className="flex flex-col p-4 gap-2 items-center justify-between w-full text-gray-500">
          <span className="font-semibold lg:text-xl">Preparing Form</span>
          <span className="font-light text-xs lg:text-sm">Please wait</span>
        </section>
      )}

      {company && company.company.length == 0 && (
        <section className="flex flex-col p-4 gap-2 items-center justify-between w-full text-red-500">
          <span className="font-semibold lg:text-xl">
            Sorry, there was an error while loading data
          </span>
          <span className="font-light text-xs lg:text-sm">
            Please refresh the page if you still see an error after 30 secs
          </span>
        </section>
      )}

      {isCompanyError && (
        <section className="flex flex-col p-4 gap-2 items-center justify-between w-full text-red-500">
          <span className="font-semibold lg:text-xl">
            Sorry, there was an error while loading data
          </span>
          <span className="font-light text-xs lg:text-sm">
            Please refresh the page if you still see an error after 30 secs
          </span>
        </section>
      )}

      {company &&
        company.company.length > 0 &&
        !isCompanyError &&
        fields.companyID != "" && (
          <>
            <CompanyEditNotifyModal
              doOpen={showStatusNotification}
              statusNotificationContent={statusNotificationContent}
              callback_OnClose_Notification={() => {
                setShowStatusNotification(false);
                companyMutate();
              }}
            />

            <form className="flex flex-col gap-6 -mt-6 items-center w-full h-full overflow-auto">
              <section className="flex px-6 gap-4 w-full items-center justify-center">
                <CompanyUploadCard_About
                  fieldsData={fields}
                  onFieldChangeCallback={HandleFieldValueChange}
                  onFileChangeCallback={HandleFileValueChange}
                />
              </section>

              <section className="flex px-6 gap-4 w-full items-center justify-center">
                <button
                  disabled={isUploadingData || isFormFilled === false}
                  onClick={HandleSubmit_Edit}
                  type="Submit"
                  className="flex p-4 gap-4 items-center justify-center w-full rounded-xl hover:shadow-lg disabled:shadow-none font-semibold text-lg text-white bg-green-500 hover:bg-green-700 disabled:bg-green-500/40 transition-all"
                >
                  {isUploadingData && (
                    <>
                      <LoadingIndicator />
                      <span>Please Wait...</span>
                    </>
                  )}

                  {!isUploadingData && (
                    <>
                      <span>
                        <CloudArrowUpIcon className="h-6 w-6" />
                      </span>
                      <span>Update Company</span>
                    </>
                  )}
                </button>
                <button
                  disabled={isUploadingData}
                  //onClick={promtDelete}
                  onClick={(e) => {e.preventDefault(); router.push("/dashboard/companies")}}
                  className="flex p-4 gap-4 items-center justify-center w-full rounded-xl hover:shadow-lg disabled:shadow-none font-semibold text-lg text-white bg-red-500 hover:bg-red-700 disabled:bg-red-500/40 transition-all"
                >
                  {isUploadingData && (
                    <>
                      <LoadingIndicator />
                      <span>Please Wait...</span>
                    </>
                  )}

                  {!isUploadingData && (
                    <>
                      <span>
                        <XMarkIcon className="h-6 w-6" />
                      </span>
                      <span>Cancel Editing</span>
                    </>
                  )}
                </button>
              </section>

              <section className="flex px-6 pb-6 gap-4 w-full items-center justify-center">
                <CompanyUploadCard_Categories
                  fieldsData={fields}
                  onCatOnly_AddCallback={HandleSubmit_Category_Add}
                  onCatOnly_EditCallback={HandleSubmit_Category_Edit}
                  onCatOnly_DeleteCallback={HandleSubmit_Category_Delete}
                  onFieldChangeCallback={HandleFieldValueChange}
                />
              </section>
            </form>
          </>
        )}
    </main>
  );
};

export default EditCompany;
