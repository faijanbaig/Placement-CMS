import axios from "axios";
import { useState } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MdExitToApp } from "react-icons/md";
const RegisterJobProfileModal = ({ isOpen, onClose }) => {
  const [loading, setLoading] = useState(false);

  const [jobData, setJobData] = useState({
    designation: "",
    salaryPackage: "",
    criteria_10: "",
    criteria_12: "",
    criteria_cllg_cgpa: "",
    lastDate: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJobData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
         `/api/v3/companies/job/new-job-profile`,
        jobData
      );
      response.data;
      toast.success("Job Profile created successfully!");
      window.location.reload();
      setJobData({
        designation: "",
        salaryPackage: "",
        criteria_10: "",
        criteria_12: "",
        criteria_cllg_cgpa: "",
        lastDate: "",
        description: "",
      });
    } catch (error) {
      console.error("Error creating student:", error.response.data.message);
      toast.error("Error creating Job Profile. Please try again.");
    }
    setLoading(false);
  };
  return (
    <>
      {isOpen && (
        <div className="fixed top-0 left-0 w-full z-10 h-full bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white flex flex-col place-items-center p-4 h-[600px] w-[950px] rounded-md">
            <div className="text-xl cursor-pointer hover:text-red-700 duration-300">
              <span>
                <MdExitToApp onClick={onClose} />
              </span>
            </div>
            <div className="bg-white  justify-center mx-3 flex place-items-center">
              <h2 className="pl-3 font-bold text-blue-500">
                REGISTER JOB PROFLE
              </h2>
            </div>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col place-items-center h-[500px] bg-gray-100 rounded-lg mt-3 w-[450px] p-4   mb-2 "
            >
              <div className="h-[380px] w-[400px] flex flex-col">
                <label className="text-xs  flex text-blue-500 font-bold font-sans">
                  Designation
                </label>
                <input
                  id="designation"
                  name="designation"
                  onChange={handleChange}
                  value={jobData.designation}
                  className=" p-1 bg-blue-100 outline-none rounded-md mb-2"
                  type="text"
                  required
                />
                <label className="text-xs flex text-blue-500 font-bold font-sans">
                  Salary Package (In Lakhs)
                </label>
                <input
                  id="salaryPackage"
                  name="salaryPackage"
                  onChange={handleChange}
                  value={jobData.salaryPackage}
                  className=" p-1  bg-blue-100 outline-none rounded-md mb-2"
                  type="text"
                  required
                />
                <label className="text-xs flex text-blue-500 font-bold font-sans">
                  Criteria 10 %
                </label>
                <input
                  id="criteria_10"
                  name="criteria_10"
                  onChange={handleChange}
                  value={jobData.criteria_10}
                  className=" p-1  bg-blue-100 outline-none rounded-md mb-2"
                  type="text"
                  required
                />
                <label className="text-xs flex text-blue-500 font-bold font-sans">
                  Criteria 12 %
                </label>
                <input
                  id="criteria_12"
                  name="criteria_12"
                  onChange={handleChange}
                  value={jobData.criteria_12}
                  className="p-1  bg-blue-100 outline-none rounded-md mb-2"
                  type="text"
                  required
                />
                <label className="text-xs flex text-blue-500 font-bold font-sans">
                  Critera UG % 
                </label>
                <input
                  id="criteria_cllg_cgpa"
                  name="criteria_cllg_cgpa"
                  onChange={handleChange}
                  value={jobData.criteria_cllg_cgpa}
                  className=" p-1  bg-blue-100 outline-none rounded-md mb-2"
                  type="text"
                  required
                />{" "}
                <label className="text-xs flex text-blue-500 font-bold font-sans">
                  Last Date to Apply
                </label>
                <input
                  id="lastDate"
                  name="lastDate"
                  onChange={handleChange}
                  value={jobData.lastDate}
                  className=" px-1 py-4 bg-blue-100  outline-none rounded-md mb-2"
                  type="date"
                  required
                />
                <label className="text-xs flex text-blue-500 font-bold font-sans">
                  Description
                </label>
                <input
                  id="description"
                  name="description"
                  onChange={handleChange}
                  value={jobData.description}
                  className=" p-1 mb-12 bg-blue-100 outline-none rounded-md "
                  type="text"
                  required
                />
              </div>
              <div className="mb-8 mt-8">
                {loading ? (
                  <div className="bg-red-600 px-8 rounded-lg text-xs font-semibold text-white py-2">
                    CREATING...
                  </div>
                ) : (
                  <button
                    type="submit"
                    className="bg-blue-600 px-8 rounded-lg text-xs font-semibold text-white py-2"
                  >
                    CREATE JOB PROFILE
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
RegisterJobProfileModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};
export default RegisterJobProfileModal;
