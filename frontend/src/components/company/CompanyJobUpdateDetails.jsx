import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PropTypes from "prop-types";

function CompanyJobUpdateDetails({ jobId, onCancel }) {
  const [values, setValues] = useState({
    designation: "",
    description: "",
    salaryPackage: "",
    criteria_10: "",
    criteria_12: "",
    criteria_cllg_cgpa: "",
    lastDate: "",
  });

  useEffect(() => {
    const fetchCompanyJobDetails = async () => {
      try {
        const res = await axios.get(
          `https://placement-cms.onrender.com/api/v3/companies/job/get-current-company-job-details/${jobId}`
        );
        const jobData = res.data.data;
        setValues(jobData); // Set the retrieved student details in the state
      } catch (error) {
        console.error("Error fetching student details:", error);
      }
    };

    fetchCompanyJobDetails(); // Fetch student details when component mounts
  }, [jobId]);

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
        designation: values.designation,
        description: values.description,
        salaryPackage: values.salaryPackage,
        criteria_10: values.criteria_10,
        criteria_12: values.criteria_12,
        criteria_cllg_cgpa: values.criteria_cllg_cgpa,
        lastDate: values.lastDate,
      };

      await axios.patch(
        `https://placement-cms.onrender.com/api/v3/companies/job/update-job-profile/${jobId}`,
        updatedData
      );
      toast.success("Job  details updated successfully");
      onCancel();
      window.location.reload();
    } catch (error) {
      console.error("Error updating job profile details:", error);
      toast.error("Error updating job profile details. Please try again.");
    }
  };

  return (
    <form>
      <div className=" ml-4 mt-4 h-[550px] bg-white mb-4 w-[480px] rounded-lg shadow-xl overflow-y-scroll no-scrollbar">
        <div className="sticky top-0 bg-transparent border-b mt-1 border-black  mx-3 flex place-items-center h-10">
          <h2 className="pl-3 font-bold text-blue-400">
            Update Job Profile details
          </h2>
        </div>

        <div className=" h-[420px] m-4 custom-scrollbar overflow-y-scroll">
          <div className="flex justify-evenly mt-8 ml-4 ">
            <table className="w-full mt-3">
              <tbody>
                <tr>
                  <td className="font-semibold text-sm p-1 whitespace-nowrap">
                    Designation :
                  </td>
                  <td>
                    <input
                      type="text"
                      name="designation"
                      onChange={handleChange}
                      value={values.designation}
                      className="shadow-sm bg-gray-100 outline-none rounded-md px-2 font-semibold text-sm "
                    />
                  </td>
                </tr>
                <tr>
                  <td className="font-semibold text-sm p-1 whitespace-nowrap">
                    Salary Package(in Lakhs) :
                  </td>
                  <td>
                    <input
                      type="text"
                      name="salaryPackage"
                      onChange={handleChange}
                      value={values.salaryPackage}
                      className=" shadow-sm bg-gray-100 outline-none rounded-md px-2 font-semibold text-sm mt-1 "
                    />
                  </td>
                </tr>
                <tr>
                  <td className="font-semibold text-sm p-1 whitespace-nowrap">
                    10th criteria % :
                  </td>
                  <td>
                    <input
                      type="text"
                      name="criteria_10"
                      onChange={handleChange}
                      value={values.criteria_10}
                      className=" shadow-sm bg-gray-100 outline-none rounded-md px-2 font-semibold text-sm mt-1 "
                    />
                  </td>
                </tr>
                <tr>
                  <td className="font-semibold text-sm p-1 whitespace-nowrap">
                    12th criteria % :
                  </td>
                  <td>
                    <input
                      type="text"
                      name="criteria_12"
                      onChange={handleChange}
                      value={values.criteria_12}
                      className=" shadow-sm bg-gray-100 outline-none rounded-md px-2 font-semibold text-sm mt-1 "
                    />
                  </td>
                </tr>
                <tr>
                  <td className="font-semibold text-sm p-1 whitespace-nowrap">
                    UG criteria % :
                  </td>
                  <td>
                    <input
                      type="text"
                      name="criteria_cllg_cgpa"
                      onChange={handleChange}
                      value={values.criteria_cllg_cgpa}
                      className=" shadow-sm bg-gray-100 outline-none rounded-md px-2 font-semibold text-sm mt-1 "
                    />
                  </td>
                </tr>
                <tr>
                  <td className="font-semibold text-sm p-1 whitespace-nowrap">
                    Last submission date :
                  </td>
                  <td>
                    <input
                      type="text"
                      name="lastDate"
                      onChange={handleChange}
                      value={values.lastDate}
                      className=" shadow-sm bg-gray-100 outline-none rounded-md px-2 font-semibold text-sm mt-1 "
                    />
                  </td>
                </tr>
                <tr>
                  <td className="font-semibold text-sm p-1 whitespace-nowrap">
                    Description :
                  </td>
                  <td>
                    <textarea
                      type="text"
                      cols="22"
                      rows="5"
                      name="description"
                      value={values.description}
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
CompanyJobUpdateDetails.propTypes = {
  jobId: PropTypes.string.isRequired,
  onCancel: PropTypes.func.isRequired,
};
export default CompanyJobUpdateDetails;
