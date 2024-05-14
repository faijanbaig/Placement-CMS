import axios from "axios";
import { useEffect, useState } from "react";
import { CgProfile } from "react-icons/cg";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PropTypes from "prop-types";
import { REACT_APP_BACKEND_URL } from "../../../variable";
function UpdateStudentDetails({ studentId, onCancel }) {
  const [values, setValues] = useState({
    id: studentId,
    fullName: "",
    enrollment: "",
    email: "",
    branch: "",
    result_10: "",
    result_12: "",
    college_cgpa: "",
    mobile: "",
    address: "",
  });

  useEffect(() => {
    const fetchStudentDetails = async () => {
      try {
        const res = await axios.get(
           `${REACT_APP_BACKEND_URL}/api/v1/users/get-student-details/${studentId}`
        );
        const studentData = res.data.data;
        setValues(studentData); // Set the retrieved student details in the state
      } catch (error) {
        console.error("Error fetching student details:", error);
      }
    };

    fetchStudentDetails(); // Fetch student details when component mounts
  }, [studentId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSave = async (e) => {
    e.preventDefault(); // Prevent default form submission

    try {
      const updatedData = {
        fullName: values.fullName,
        enrollment: values.enrollment,
        email: values.email,
        branch: values.branch,
        result_10: values.result_10,
        result_12: values.result_12,
        college_cgpa: values.college_cgpa,
        mobile: values.mobile,
        address: values.address,
      };

      await axios.patch(
         `${REACT_APP_BACKEND_URL}/api/v1/users/update-student-details/${studentId}`,
        updatedData
      );
      toast.success("Student details updated successfully");

      // console.log("Student details updated successfully");
      onCancel();
      window.location.reload();
    } catch (error) {
      console.error("Error updating student details:", error);
      toast.error("Error updating student details. Please try again.");
    }
  };

  return (
    <form>
      <div className=" ml-4 mt-4 h-[550px] bg-white mb-4 w-[380px] rounded-lg shadow-xl overflow-y-scroll no-scrollbar">
        <div className="sticky top-0 bg-transparent border-b mt-1 border-black  mx-3 flex place-items-center h-10">
          <h2 className="pl-3 font-bold text-blue-400">
            Update student details
          </h2>
        </div>
        <div className="flex justify-center mt-3 mb-2 ">
          <div>
            {values.avatar ? (
              <img
                src={values.avatar}
                className="h-20 w-20 rounded-full "
                alt="image"
              />
            ) : (
              <CgProfile className="h-20 w-20 text-blue-500" />
            )}
          </div>
        </div>

        <div className=" h-[330px] custom-scrollbar overflow-y-scroll">
          <div className="flex justify-evenly mt-3 ml-6 ">
            <table className="w-full mt-3">
              <tbody>
                <tr>
                  <td className="font-semibold text-sm p-1 whitespace-nowrap">
                    Name :
                  </td>
                  <td>
                    <input
                      type="text"
                      name="fullName"
                      onChange={handleChange}
                      value={values.fullName}
                      className=" shadow-sm bg-gray-100 outline-none rounded-md px-2 font-semibold text-sm "
                    />
                  </td>
                </tr>
                <tr>
                  <td className="font-semibold text-sm p-1 whitespace-nowrap">
                    Enrollment :
                  </td>
                  <td>
                    <input
                      type="text"
                      name="enrollment"
                      onChange={handleChange}
                      value={values.enrollment}
                      className=" shadow-sm bg-gray-100 outline-none rounded-md px-2 font-semibold text-sm mt-1 "
                    />
                  </td>
                </tr>
                <tr>
                  <td className="font-semibold text-sm p-1 whitespace-nowrap">
                    Email :
                  </td>
                  <td>
                    <input
                      type="text"
                      name="email"
                      onChange={handleChange}
                      value={values.email}
                      className=" shadow-sm bg-gray-100 outline-none rounded-md px-2 font-semibold text-sm mt-1 "
                    />
                  </td>
                </tr>
                <tr>
                  <td className="font-semibold text-sm p-1 whitespace-nowrap">
                    Branch :
                  </td>
                  <td>
                    <input
                      type="text"
                      name="branch"
                      onChange={handleChange}
                      value={values.branch}
                      className=" shadow-sm bg-gray-100 outline-none rounded-md px-2 font-semibold text-sm mt-1 "
                    />
                  </td>
                </tr>
                <tr>
                  <td className="font-semibold text-sm p-1 whitespace-nowrap">
                    Class X %:
                  </td>
                  <td>
                    <input
                      type="text"
                      name="result_10"
                      value={values.result_10}
                      onChange={handleChange}
                      className=" shadow-sm bg-gray-100 outline-none rounded-md px-2 font-semibold text-sm mt-1 "
                    />
                  </td>
                </tr>
                <tr>
                  <td className="font-semibold text-sm p-1 whitespace-nowrap">
                    Class XII % :
                  </td>
                  <td>
                    <input
                      type="text"
                      name="result_12"
                      value={values.result_12}
                      onChange={handleChange}
                      className=" shadow-sm bg-gray-100 outline-none rounded-md px-2 font-semibold text-sm mt-1 "
                    />
                  </td>
                </tr>
                <tr>
                  <td className="font-semibold text-sm p-1 whitespace-nowrap">
                    UG Result % :
                  </td>
                  <td>
                    <input
                      type="text"
                      name="college_cgpa"
                      value={values.college_cgpa}
                      onChange={handleChange}
                      className=" shadow-sm bg-gray-100 outline-none rounded-md px-2 font-semibold text-sm mt-1 "
                    />
                  </td>
                </tr>
                <tr>
                  <td className="font-semibold text-sm p-1 whitespace-nowrap">
                    Mobile :
                  </td>
                  <td>
                    <input
                      type="tel"
                      name="mobile"
                      value={values.mobile}
                      onChange={handleChange}
                      className=" shadow-sm bg-gray-100 outline-none rounded-md px-2 font-semibold text-sm mt-1 "
                    />
                  </td>
                </tr>
                <tr>
                  <td className="font-semibold text-sm p-1 whitespace-nowrap">
                    Address :
                  </td>
                  <td>
                    <input
                      type="text"
                      name="address"
                      value={values.address}
                      onChange={handleChange}
                      className=" shadow-sm bg-gray-100 outline-none rounded-md px-2 font-semibold text-sm mt-1 "
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="btns flex  justify-evenly mt-4 mb-4">
          <button
            type="submit"
            onClick={handleSave}
            className="bg-blue-600 px-8 rounded-lg text-xs font-semibold text-white py-2"
          >
            SAVE
          </button>
          <button
            onClick={onCancel}
            className="bg-red-600 px-8 rounded-lg text-xs font-semibold text-white py-2"
          >
            CANCEL
          </button>
        </div>
      </div>
    </form>
  );
}
UpdateStudentDetails.propTypes = {
  studentId: PropTypes.string.isRequired,
  onCancel: PropTypes.func.isRequired,
};
export default UpdateStudentDetails;
