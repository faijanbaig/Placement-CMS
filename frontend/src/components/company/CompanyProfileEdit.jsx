import { CgProfile } from "react-icons/cg";
import GetAllCompanies from "../../API/GetAllCompaniesApi";
import PropTypes from "prop-types";

function CompanyProfileEdit({ onEditClick }) {
  const apiUrl = ` /api/v2/companies/get-current-company-details`;
  const { companies } = GetAllCompanies(apiUrl);
  return (
    <div className="bg-white flex-col mt-4 mb-4 mr-10 h-[550px] rounded-lg shadow-md justify-center flex place-items-center">
      <div className="mt-4 h-[550px] bg-gray-100 mb-4 w-[380px] rounded-lg shadow-md shadow-gray-400 overflow-y-scroll no-scrollbar">
        <div className="sticky top-0 bg-gray-100 border-b border-black  mx-3 flex place-items-center h-10">
          <h2 className="pl-3 font-bold text-blue-500">Company details</h2>
        </div>
        <div className="flex justify-center mt-3 mb-2  ">
          {companies.avatar ? (
            <img
              src={companies.avatar}
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
                  <td className="font-semibold text-sm p-1">
                    {companies.name}
                  </td>
                </tr>
                <tr>
                  <td className="font-semibold text-sm p-1 whitespace-nowrap">
                    Email :
                  </td>
                  <td className="font-semibold text-sm p-1">
                    {companies.email}
                  </td>
                </tr>
                <tr>
                  <td className="font-semibold text-sm p-1 whitespace-nowrap">
                    Website :
                  </td>
                  <td className="font-semibold text-blue-500 text-sm p-1 hover:underline">
                    <a
                      href={companies.website}
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
                    {companies.description}
                  </td>
                </tr>
                <tr>
                  <td className="font-semibold text-sm p-1 whitespace-nowrap">
                    Address :
                  </td>
                  <td className="font-semibold text-sm p-1">
                    {companies.address}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="btns flex  justify-evenly mt-1 mb-2">
          <button
            onClick={onEditClick}
            className="bg-blue-600 px-8 rounded-lg text-xs font-semibold text-white py-2"
          >
            EDIT
          </button>
        </div>
      </div>
    </div>
  );
}
CompanyProfileEdit.propTypes = {
  onEditClick: PropTypes.func.isRequired,
};
export default CompanyProfileEdit;
