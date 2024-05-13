import axios from "axios";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import TruncatedText from "../../services/TruncatedText";
import Warning from "../Warning";
function CompanyJobDetails({ jobId, onEditClick }) {
  const [job, setJob] = useState(null);
  const [isWarningModalOpen, setWarningModalOpen] = useState(false);

  useEffect(() => {
    const fetchCompanyJobDetails = async () => {
      try {
        const res = await axios.get(
          ` /api/v3/companies/job/get-current-company-job-details/${jobId}`
        );
        setJob(res.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    if (jobId) {
      fetchCompanyJobDetails();
    }
  }, [jobId]);

  if (!job) {
    return;
  }

  if (!job) {
    return null;
  }

  const handleDelete = async () => {
    try {
      await axios.delete(` /api/v3/companies/job/delete-job-profile/${jobId}`);
      console.log("Job Profile deleted successfully");
      window.location.reload();
    } catch (error) {
      console.log("Error deleting job profile:", error);
    }
  };

  return (
    <div className=" ml-4 mt-4 h-[550px] bg-white mb-4 w-[480px] rounded-lg shadow-xl overflow-y-scroll no-scrollbar">
      <div className="sticky top-0 bg-white border-b border-black  mx-3 flex place-items-center h-10">
        <h2 className="pl-3 font-bold text-blue-400">Job Profile details</h2>
      </div>
      <div className=" h-[350px]  mt-8 mx-4 mb-12 custom-scrollbar overflow-y-scroll">
        <div className="flex justify-evenly mt-3 ml-6 ">
          <table className="w-full mt-3">
            <tbody>
              <tr>
                <td className="font-semibold text-sm p-1 whitespace-nowrap">
                  Designation :
                </td>
                <td className="font-semibold text-sm p-1">{job.designation}</td>
              </tr>
              <tr>
                <td className="font-semibold text-sm p-1 whitespace-nowrap">
                  Salary Package(in Lakhs) :
                </td>
                <td className="font-semibold text-sm p-1">
                  {job.salaryPackage}
                </td>
              </tr>
              <tr>
                <td className="font-semibold text-sm p-1 whitespace-nowrap">
                  10th criteria % :
                </td>
                <td className="font-semibold text-sm p-1">{job.criteria_10}</td>
              </tr>
              <tr>
                <td className="font-semibold text-sm p-1 whitespace-nowrap">
                  12th criteria % :
                </td>
                <td className="font-semibold text-sm p-1">{job.criteria_12}</td>
              </tr>
              <tr>
                <td className="font-semibold text-sm p-1 whitespace-nowrap">
                  UG criteria % :
                </td>
                <td className="font-semibold text-sm p-1">
                  {job.criteria_cllg_cgpa}
                </td>
              </tr>
              <tr>
                <td className="font-semibold text-sm p-1 whitespace-nowrap">
                  Last submission date :
                </td>
                <td className="font-semibold text-sm p-1">{job.lastDate}</td>
              </tr>
              <tr>
                <td className="font-semibold text-sm p-1 whitespace-nowrap">
                  Description :
                </td>
                <td className="font-semibold text-sm p-1">
                  <TruncatedText text={job.description} maxLength={50} />
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
CompanyJobDetails.propTypes = {
  jobId: PropTypes.string.isRequired,
  onEditClick: PropTypes.func.isRequired,
};

export default CompanyJobDetails;
