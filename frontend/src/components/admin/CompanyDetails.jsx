import axios from "axios";
import { useEffect, useState } from "react";
import { CgProfile } from "react-icons/cg";
import PropTypes from "prop-types";
import Warning from "../Warning";

function CompanyDetails({ companyId, onEditClick }) {
  const [company, setCompany] = useState(null);
  const [isWarningModalOpen, setWarningModalOpen] = useState(false);

  useEffect(() => {
    const fetchCompanyDetails = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.REACT_APP_BACKEND_URL}/api/v2/companies/get-company-details/${companyId}`
        );
        setCompany(res.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    if (companyId) {
      fetchCompanyDetails();
    }
  }, [companyId]);

  if (!company) {
    return;
  }

  if (!company) {
    return null;
  }

  const handleDelete = async () => {
    // Show confirmation dialog before deleting
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this Company?"
    );
    if (confirmDelete) {
      try {
        await axios.delete(`${import.meta.env.REACT_APP_BACKEND_URL}/api/v1/users/delete-company/${companyId}`);
        console.log("Company deleted successfully");
        // Close the component after successful deletion
        window.location.reload();
      } catch (error) {
        console.log("Error deleting company:", error);
      }
    }
  };

  return (
    <div className=" ml-4 mt-4 h-[550px] bg-white mb-4 w-[380px] rounded-lg shadow-xl overflow-y-scroll no-scrollbar">
      <div className="sticky top-0 bg-white border-b border-black  mx-3 flex place-items-center h-10">
        <h2 className="pl-3 font-bold text-blue-400">Company details</h2>
      </div>
      <div className="flex justify-center mt-3 mb-2  ">
        {company.avatar ? (
          <img
            src={company.avatar}
            className="h-20 w-20 rounded-full "
            alt="image"
          />
        ) : (
          <CgProfile className="h-20 w-20 text-blue-500" />
        )}
      </div>
      <div className=" h-[330px] custom-scrollbar overflow-y-scroll">
        <div className="flex justify-evenly mt-3 ml-6 ">
          <table className="w-full mt-3">
            <tbody>
              <tr>
                <td className="font-semibold text-sm p-1 whitespace-nowrap">
                  Name :
                </td>
                <td className="font-semibold text-sm p-1">{company.name}</td>
              </tr>
              <tr>
                <td className="font-semibold text-sm p-1 whitespace-nowrap">
                  Email :
                </td>
                <td className="font-semibold text-sm p-1">{company.email}</td>
              </tr>
              <tr>
                <td className="font-semibold text-sm p-1 whitespace-nowrap">
                  Website :
                </td>
                <td className="font-semibold text-blue-500 text-sm p-1 ">
                  <a
                    href={company.website}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:underline"
                  >
                    Visit Us
                  </a>
                </td>
              </tr>
              <tr>
                <td className="font-semibold text-sm p-1 whitespace-nowrap">
                  Description :
                </td>
                <td className="font-semibold text-sm p-1">
                  {company.description}
                </td>
              </tr>
              <tr>
                <td className="font-semibold text-sm p-1 whitespace-nowrap">
                  Address :
                </td>
                <td className="font-semibold text-sm p-1">{company.address}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="btns flex  justify-evenly mt-4 mb-4">
        <button
          onClick={onEditClick}
          className="bg-blue-600 px-8 rounded-lg text-xs font-semibold text-white py-2"
        >
          EDIT
        </button>

        <button
          onClick={() => setWarningModalOpen(true)}
          className="bg-red-600 px-8 rounded-lg text-xs font-semibold text-white py-2"
        >
          DELETE
        </button>
        <Warning
          isOpen={isWarningModalOpen}
          onClose={() => setWarningModalOpen(false)}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
}
CompanyDetails.propTypes = {
  companyId: PropTypes.string.isRequired,
  onEditClick: PropTypes.func.isRequired,
};
export default CompanyDetails;
