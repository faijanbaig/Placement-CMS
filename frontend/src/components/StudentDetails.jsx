import axios from "axios";
import { useEffect, useState } from "react";
import { CgProfile } from "react-icons/cg";
import PropTypes from "prop-types";
import Warning from "./Warning";

function StudentDetails({ studentId, onEditClick }) {
  const [student, setStudent] = useState(null);
  const [isWarningModalOpen, setWarningModalOpen] = useState(false);

  useEffect(() => {
    const fetchStudentDetails = async () => {
      try {
        const res = await axios.get(
          `/api/v1/users/get-student-details/${studentId}`
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
    return;
  }

  if (!student) {
    return null;
  }

  const handleDelete = async () => {
    try {
      await axios.delete(`${import.meta.env.REACT_APP_BACKEND_URL}/api/v1/users/delete-student/${studentId}`);
      console.log("Student deleted successfully");
      window.location.reload();
    } catch (error) {
      console.log("Error deleting student:", error);
    }
  };

  return (
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
                <td className="font-semibold text-sm p-1">{student.email}</td>
              </tr>
              <tr>
                <td className="font-semibold text-sm p-1 whitespace-nowrap">
                  Branch :
                </td>
                <td className="font-semibold text-sm p-1"> {student.branch}</td>
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
                  UG Result :
                </td>
                <td className="font-semibold text-sm p-1">
                  {student.college_cgpa}
                </td>
              </tr>
              <tr>
                <td className="font-semibold text-sm p-1 whitespace-nowrap">
                  Mobile :
                </td>
                <td className="font-semibold text-sm p-1"> {student.mobile}</td>
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
                <td className="font-semibold text-sm p-1">{student.address}</td>
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
      </div>
      <Warning
        isOpen={isWarningModalOpen}
        onClose={() => setWarningModalOpen(false)}
        onDelete={handleDelete}
      />
    </div>
  );
}
StudentDetails.propTypes = {
  studentId: PropTypes.string.isRequired,
  onEditClick: PropTypes.func.isRequired,
};

export default StudentDetails;
