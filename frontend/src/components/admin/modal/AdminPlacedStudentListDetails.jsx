import { useEffect, useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { CgProfile } from "react-icons/cg";

const AdminPlacedStudentListDetailsModal = ({ studentId, isOpen, onClose }) => {
  const [student, setStudent] = useState(null);

  useEffect(() => {
    const fetchStudentDetails = async () => {
      try {
        const res = await axios.get(
          `https://placement-cms.onrender.com/api/v1/users/get-student-details/${studentId}`
        );
        setStudent(res.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    if (studentId) {
      fetchStudentDetails();
    }
  }, [studentId]);

  if (!student) {
    return null;
  }

  return (
    <>
      {isOpen && (
        <div className="fixed top-0 left-0 z-10 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
          <div className=" ml-4 mt-4 h-[550px] bg-white mb-4 w-[380px] rounded-lg shadow-xl overflow-y-scroll no-scrollbar">
            <div className="bg-white border-b border-black  mx-3 flex place-items-center h-10">
              <h2 className="pl-3 font-bold text-blue-400">Student details</h2>
            </div>
            <div className="flex justify-center mt-3 mb-2  ">
              {student.avatar ? (
                <img
                  src={student.avatar}
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
                        {student.fullName}
                      </td>
                    </tr>

                    <tr>
                      <td className="font-semibold text-sm p-1 whitespace-nowrap">
                        Enrollment :
                      </td>
                      <td className="font-semibold text-sm p-1">
                        {student.enrollment}
                      </td>
                    </tr>
                    <tr>
                      <td className="font-semibold text-sm p-1 whitespace-nowrap">
                        Email :
                      </td>
                      <td className="font-semibold text-sm p-1">
                        {student.email}
                      </td>
                    </tr>
                    <tr>
                      <td className="font-semibold text-sm p-1 whitespace-nowrap">
                        Branch :
                      </td>
                      <td className="font-semibold text-sm p-1">
                        {" "}
                        {student.branch}
                      </td>
                    </tr>
                    <tr>
                      <td className="font-semibold text-sm p-1 whitespace-nowrap">
                        Class X %:
                      </td>
                      <td className="font-semibold text-sm p-1">
                        {student.result_10}
                      </td>
                    </tr>
                    <tr>
                      <td className="font-semibold text-sm p-1 whitespace-nowrap">
                        Class XII % :
                      </td>
                      <td className="font-semibold text-sm p-1">
                        {student.result_12}
                      </td>
                    </tr>
                    <tr>
                      <td className="font-semibold text-sm p-1 whitespace-nowrap">
                        UG Result % :
                      </td>
                      <td className="font-semibold text-sm p-1">
                        {student.college_cgpa}
                      </td>
                    </tr>
                    <tr>
                      <td className="font-semibold text-sm p-1 whitespace-nowrap">
                        Mobile :
                      </td>
                      <td className="font-semibold text-sm p-1">
                        {" "}
                        {student.mobile}
                      </td>
                    </tr>
                    {student.isPlaced && (
                      <>
                        <tr>
                          <td className="font-semibold text-sm p-1 whitespace-nowrap">
                            Company Name :
                          </td>
                          <td className="font-semibold text-green-500 text-sm p-1">
                            {student.designation.company.name}
                          </td>
                        </tr>
                        <tr>
                          <td className="font-semibold  text-sm p-1 whitespace-nowrap">
                            Designation :
                          </td>
                          <td className="font-semibold text-green-500 text-sm p-1">
                            {student.designation.designation}
                          </td>
                        </tr>
                        <tr>
                          <td className="font-semibold text-sm p-1 whitespace-nowrap">
                            Package :
                          </td>
                          <td className="font-semibold text-green-500 text-sm p-1">
                            {student.designation.salaryPackage} <span>LPA</span>
                          </td>
                        </tr>
                      </>
                    )}

                    <tr>
                      <td className="font-semibold text-sm p-1 whitespace-nowrap">
                        Address :
                      </td>
                      <td className="font-semibold text-sm p-1">
                        {student.address}
                      </td>
                    </tr>
                    <tr>
                      <td className="font-semibold text-sm p-1 whitespace-nowrap">
                        Resume :
                      </td>
                      <td className="font-semibold text-sm p-1">
                        {student.resume ? (
                          <a
                            href={student.resume}
                            target="_blank"
                            className="text-blue-500 font-bold hover:underline"
                          >
                            Open resume
                          </a>
                        ) : (
                          <span>No resume available</span>
                        )}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="btns flex  justify-evenly mt-4 mb-4">
              <button
                onClick={onClose}
                className="bg-red-600 px-8 rounded-lg text-xs font-semibold text-white py-2"
              >
                EXIT
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

AdminPlacedStudentListDetailsModal.propTypes = {
  studentId: PropTypes.string.isRequired,
  isOpen: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};
export default AdminPlacedStudentListDetailsModal;
