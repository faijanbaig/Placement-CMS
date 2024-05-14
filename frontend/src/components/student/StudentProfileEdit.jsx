import { CgProfile } from "react-icons/cg";
import GetAllStudents from "../../API/GetAllStudentsApi";
import PropTypes from "prop-types";
import { REACT_APP_BACKEND_URL } from "../../../variable";

function StudentProfileEdit({ onEditClick }) {
  const apiUrl = `${REACT_APP_BACKEND_URL}/api/v1/users/get-user`;
  const { students } = GetAllStudents(apiUrl);
  return (
    <div className="bg-white flex-col mt-4 mb-4 mr-10 h-[550px] rounded-lg shadow-md justify-center flex place-items-center">
      <div className="mt-4 h-[570px] bg-gray-100 mb-4 w-[380px] rounded-lg shadow-md shadow-gray-400 overflow-y-scroll no-scrollbar">
        <div className="sticky top-0 bg-gray-100 border-b border-black  mx-3 flex place-items-center h-10">
          <h2 className="pl-3 font-bold text-blue-500">Student details</h2>
        </div>
        <div className="flex justify-center mt-3 mb-2  ">
          {students.avatar ? (
            <img
              src={students.avatar}
              className="h-20 w-20 rounded-full "
              alt="image"
            />
          ) : (
            <CgProfile className="h-20 w-20 text-blue-500" />
          )}
        </div>
        <div className=" h-[330px] custom-scrollbar  overflow-y-scroll">
          <div className="flex justify-evenly mt-3 ml-6 ">
            <table className="w-full mt-3">
              <tbody>
                <tr>
                  <td className="font-semibold text-sm p-1 whitespace-nowrap">
                    Name :
                  </td>
                  <td className="font-semibold text-sm p-1">
                    {students.fullName}
                  </td>
                </tr>

                <tr>
                  <td className="font-semibold text-sm p-1 whitespace-nowrap">
                    Enrollment :
                  </td>
                  <td className="font-semibold text-sm p-1">
                    {students.enrollment}
                  </td>
                </tr>
                <tr>
                  <td className="font-semibold text-sm p-1 whitespace-nowrap">
                    Email :
                  </td>
                  <td className="font-semibold text-sm p-1">
                    {students.email}
                  </td>
                </tr>
                <tr>
                  <td className="font-semibold text-sm p-1 whitespace-nowrap">
                    Branch :
                  </td>
                  <td className="font-semibold text-sm p-1">
                    {" "}
                    {students.branch}
                  </td>
                </tr>
                <tr>
                  <td className="font-semibold text-sm p-1 whitespace-nowrap">
                    Class X %:
                  </td>
                  <td className="font-semibold text-sm p-1">
                    {students.result_10}
                  </td>
                </tr>
                <tr>
                  <td className="font-semibold text-sm p-1 whitespace-nowrap">
                    Class XII % :
                  </td>
                  <td className="font-semibold text-sm p-1">
                    {students.result_12}
                  </td>
                </tr>
                <tr>
                  <td className="font-semibold text-sm p-1 whitespace-nowrap">
                    UG Result % :
                  </td>
                  <td className="font-semibold text-sm p-1">
                    {students.college_cgpa}
                  </td>
                </tr>
                <tr>
                  <td className="font-semibold text-sm p-1 whitespace-nowrap">
                    Mobile :
                  </td>
                  <td className="font-semibold text-sm p-1">
                    {students.mobile}
                  </td>
                </tr>
                {students.isPlaced && (
                  <>
                    <tr>
                      <td className="font-semibold text-sm p-1 whitespace-nowrap">
                        Company Name :
                      </td>
                      <td className="font-semibold text-green-500 text-sm p-1">
                        {students.designation.company.name}
                      </td>
                    </tr>
                    <tr>
                      <td className="font-semibold  text-sm p-1 whitespace-nowrap">
                        Designation :
                      </td>
                      <td className="font-semibold text-green-500 text-sm p-1">
                        {students.designation.designation}
                      </td>
                    </tr>
                    <tr>
                      <td className="font-semibold text-sm p-1 whitespace-nowrap">
                        Package :
                      </td>
                      <td className="font-semibold text-green-500 text-sm p-1">
                        {students.designation.salaryPackage} <span>LPA</span>
                      </td>
                    </tr>
                  </>
                )}

                <tr>
                  <td className="font-semibold text-sm p-1 whitespace-nowrap">
                    Address :
                  </td>
                  <td className="font-semibold text-sm p-1">
                    {students.address}
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
StudentProfileEdit.propTypes = {
  onEditClick: PropTypes.func.isRequired,
};
export default StudentProfileEdit;
