import axios from "axios";
import { useEffect, useState } from "react";
import { CgProfile } from "react-icons/cg";
import PropTypes from "prop-types";

function CompanyDetailsForStudent({ companyId }) {
  const [company, setCompany] = useState(null);

  useEffect(() => {
    const fetchCompanyDetails = async () => {
      try {
        const res = await axios.get(
          ` /api/v2/companies/get-company-details/${companyId}`
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
                <td className="font-semibold text-sm p-1">
                  <a href={company.website} target="_blank" rel="noreferrer">
                    {/*to update the link tag not working properly*/}
                    {company.website}
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
        <div className="bg-blue-600 px-8 rounded-lg text-xs font-semibold text-white py-2">
          {company.name}
        </div>
      </div>
    </div>
  );
}
CompanyDetailsForStudent.propTypes = {
  companyId: PropTypes.string.isRequired,
};

export default CompanyDetailsForStudent;
