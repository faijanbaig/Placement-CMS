import { CgProfile } from "react-icons/cg";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { REACT_APP_BACKEND_URL } from "../../../variable";

function PlacedStudentList({ students, onStudentClick }) {
  const handleDowloadSuccesMessage = () => {
    toast.success("Downloaded Successfully !");
  };
  return (
    <div className="mt-4 h-[550px]  bg-white mb-4 w-[300px] rounded-lg shadow-xl overflow-y-scroll no-scrollbar">
      <div className="sticky top-0 bg-white border-b border-black  mx-2 flex justify-between place-items-center h-10">
        <h2 className="pl-3 font-bold text-blue-500">
          Placed student :
          <span className="ml-2 text-black  whitespace-nowrap font-semibold text-xs">
            {students.length}
          </span>
        </h2>
        <a
          href={`${REACT_APP_BACKEND_URL}/api/v1/users/placed-student-list-download`}
          onClick={handleDowloadSuccesMessage}
          download="placedStudents.csv"
          className="mr-2 text-xs font-bold cursor-pointer hover:bg-blue-100 text-blue-600 border border-blue-500 px-2 py-1 rounded-lg"
        >
          Export to csv
        </a>
      </div>
      <div>
        {students.map((student) => (
          <div
            key={student._id}
            className="bg-[#e9f1ef] mt-2 ml-2 mr-2 hover:bg-blue-200 rounded-lg p-1 flex place-items-center cursor-pointer"
            onClick={() => onStudentClick(student._id)}
          >
            {student.avatar ? (
              <img
                src={student.avatar}
                className="h-8 w-8  rounded-full "
                alt="image"
              />
            ) : (
              <CgProfile className="h-8 w-8 text-blue-500" />
            )}
            <div className="pl-3">
              <h1 className="text-sm font-semibold cursor-pointer">
                {student.fullName}
              </h1>
              <p className="text-blue-500 text-xs font-bold ">
                {student.enrollment}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
PlacedStudentList.propTypes = {
  students: PropTypes.array.isRequired,
  onStudentClick: PropTypes.func.isRequired,
};
export default PlacedStudentList;
