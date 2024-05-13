import { useEffect, useState } from "react";
import TruncatedText from "../../services/TruncatedText";
import axios from "axios";
import { CgProfile } from "react-icons/cg";
import PropTypes from "prop-types";
import { toast } from "react-toastify";

function JobDetails({ jobId }) {
  const [job, setJob] = useState(null);
  const [applyJob, setApplyJobs] = useState([]);
  const [lastDatePassed, setLastDatePassed] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCompanyJobDetails = async () => {
      try {
        const res = await axios.get(
          `https://placement-cms.onrender.com/api/v3/companies/job/get-job-details/${jobId}`
        );
        setJob(res.data.data);
        // Check if the last date has passed
        const lastDate = res.data.data.lastDate;
        const currentDate = new Date();
        if (currentDate.toISOString().slice(0, 10) > lastDate) {
          setLastDatePassed(true);
        } else {
          setLastDatePassed(false);
        }
      } catch (error) {
        console.log(error);
      }
    };

    if (jobId) {
      fetchCompanyJobDetails();
    }
  }, [jobId]);

  useEffect(() => {
    const fetchAppliedJobs = async () => {
      try {
        const res = await axios.get(
          `https://placement-cms.onrender.com/api/v3/companies/job/applied-jobid-student`
        );
        setApplyJobs(res.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchAppliedJobs();
  }, []);

  if (!job) {
    return null;
  }

  const applyHandle = async (jobId) => {
    if (loading) return;
    setLoading(true);
    try {
      await axios.get(`https://placement-cms.onrender.com/api/v3/companies/job/apply-for-job/${jobId}`);
      setApplyJobs([...applyJob, jobId]);
      toast.success("Applied for the job successfully!");
      console.log("Applied for the job successfully!");
    } catch (error) {
      console.log(error);
      toast.error("You are not eligible for the job.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=" ml-4 mt-4 h-[550px] bg-white mb-4 w-[480px] rounded-lg shadow-xl overflow-y-scroll no-scrollbar">
      <div className="sticky top-0 bg-white border-b border-black  mx-3 flex place-items-center h-10">
        <h2 className="pl-3 font-bold text-blue-400">Job Profile details</h2>
      </div>
      <div className="flex justify-center mt-3 mb-2  ">
        {job.company.avatar ? (
          <img
            src={job.company.avatar}
            className="h-16 w-16 rounded-full "
            alt="image"
          />
        ) : (
          <CgProfile className="h-16 w-16 text-blue-500" />
        )}
      </div>
      <div className=" h-[350px] mt-2 mx-4 mb-4 custom-scrollbar overflow-y-scroll">
        <div className="flex justify-evenly mt-3 ml-6 ">
          <table className="w-full mt-3">
            <tbody>
              <tr>
                <td className="font-semibold text-sm p-1 whitespace-nowrap">
                  Company :
                </td>
                <td className="font-semibold text-sm p-1">
                  {job.company.name}
                </td>
              </tr>
              <tr>
                <td className="font-semibold text-sm p-1 whitespace-nowrap">
                  Designation :
                </td>
                <td className="font-semibold text-sm p-1">{job.designation}</td>
              </tr>
              <tr>
                <td className="font-semibold text-sm p-1 whitespace-nowrap">
                  Company website :
                </td>
                <td className="font-semibold text-sm p-1">
                  <a
                    className="text-blue-600 hover:underline"
                    target="_blank"
                    href={job.company.website}
                  >
                    Open link
                  </a>
                </td>
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
                  Address :
                </td>
                <td className="font-semibold text-sm p-1">
                  {job.company.address}
                </td>
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
      {!lastDatePassed ? (
        <div className="btns flex  justify-evenly mt-4 mb-4">
          <button
            onClick={() => applyHandle(jobId)}
            className={`bg-blue-600 px-8 rounded-lg text-xs font-semibold text-white py-2 ${
              applyJob.includes(jobId) ? "bg-green-500" : "bg-blue-500"
            }`}
            disabled={applyJob.includes(jobId) || loading}
          >
            {loading
              ? "APPLYING..."
              : applyJob.includes(jobId)
              ? "APPLIED"
              : "APPLY"}
          </button>
        </div>
      ) : (
        <div className="btns flex  justify-evenly mt-4 mb-4">
          <button className="bg-red-600 px-8 rounded-lg text-xs font-semibold text-white py-2">
            EXPIRED
          </button>
        </div>
      )}
    </div>
  );
}
JobDetails.propTypes = {
  jobId: PropTypes.string.isRequired,
};

export default JobDetails;
