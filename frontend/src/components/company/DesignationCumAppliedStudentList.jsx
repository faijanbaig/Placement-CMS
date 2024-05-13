import axios from "axios";
import { useEffect, useState } from "react";
import { CgProfile } from "react-icons/cg";
import PropTypes from "prop-types";
import HireModal from "./Modal/HireModal";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function DesignationCumAppliedStudentList({ jobId, onStudentClick }) {
  const [job, setJob] = useState(null);
  const [hiredStudents, setHiredStudents] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [designation, setDesignation] = useState(null);
  useEffect(() => {
    const fetchCompanyJobDetails = async () => {
      try {
        const res = await axios.get(
          `https://placement-cms.onrender.com/api/v2/companies/get-applied-students-list/${jobId}`
        );
        setJob(res.data.data);
        const resDesignation = await axios.get(
          `https://placement-cms.onrender.com/api/v3/companies/job/get-job-details/${jobId}`
        );
        setDesignation(resDesignation.data.data.designation);
        // console.log("designation ", resDesignation.data.data.designation);
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

  const unHireStudents = async (jobId) => {
    try {
      await axios.get(`https://placement-cms.onrender.com/api/v2/companies/unhire-all-student/${jobId}`);
      console.log("unhirhired clicked");
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const hireStudent = async (studentId, jobId) => {
    try {
      await axios.get(`https://placement-cms.onrender.com/api/v2/companies/hire-student/${studentId}/${jobId}`);
      setHiredStudents([...hiredStudents, studentId]);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDowloadSuccesMessage = () => {
    toast.success("Downloaded Successfully !");
  };

  return (
    <div className="mt-4 h-[550px]  bg-white mb-4 w-[500px] rounded-lg shadow-xl overflow-y-scroll no-scrollbar">
      <div className="sticky top-0 bg-white border-b border-black  mx-4 flex justify-between place-items-center h-14">
        <h1 className="pl-3  font-bold text-blue-500 ">
          APPLIED STUDENTS :
          <span className="ml-2 text-black whitespace-nowrap font-semibold text-md">
            {job.length}
          </span>
          <p className="text-[13px] font-semibold -mt-2  -mb-2 text-black">
            {designation}
          </p>
        </h1>
        <div className="flex">
          <a
            href={`/api/v2/companies/applied-student-list-download/${jobId}`}
            onClick={handleDowloadSuccesMessage}
            download="users.csv"
            className="mr-2 text-xs font-bold cursor-pointer text-blue-600 border border-blue-500 px-2 py-1 rounded-lg"
          >
            Export to csv
          </a>
          <div className="mr-2 text-sm font-bold text-red-600 border border-red-500 px-2 py-1 rounded-lg">
            <button onClick={() => setIsModalOpen(true)}>CLEAR ALL LIST</button>
          </div>
        </div>
      </div>
      {job.map((student) => (
        <div key={student._id}>
          <div className="bg-[#e9f1ef] mt-2 mx-4 justify-between hover:bg-blue-200 rounded-lg p-1 flex place-items-center ">
            <div
              onClick={() => onStudentClick(student._id)}
              className="flex place-items-center cursor-pointer"
            >
              {student.avatar ? (
                <img
                  src={student.avatar}
                  className="h-12 w-12 mr-1 ml-4 rounded-full "
                  alt="image"
                />
              ) : (
                <CgProfile className="h-12 w-12 mr-1 ml-4 text-blue-500" />
              )}
              <div>
                <h1 className="text-md font-semibold cursor-pointer">
                  {student.fullName}
                </h1>
                <p className="text-blue-500 text-xs font-bold ">
                  {student.enrollment}
                </p>
              </div>
            </div>
            <button
              onClick={() => hireStudent(student._id, jobId)}
              className={`mr-10 text-white px-3 py-1 text-sm font-bold rounded-lg ${
                hiredStudents.includes(student._id)
                  ? "bg-green-500"
                  : "bg-blue-500"
              }`}
              disabled={hiredStudents.includes(student._id)}
            >
              {hiredStudents.includes(student._id) ? "HIRED" : "HIRE"}
            </button>
          </div>
        </div>
      ))}
      <HireModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        unHireAll={() => {
          unHireStudents(jobId);
          setIsModalOpen(false);
        }}
      />
    </div>
  );
}
DesignationCumAppliedStudentList.propTypes = {
  jobId: PropTypes.string.isRequired,
  onStudentClick: PropTypes.func.isRequired,
};

export default DesignationCumAppliedStudentList;
