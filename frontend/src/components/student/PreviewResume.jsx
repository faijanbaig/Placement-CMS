import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import GetAllStudents from "../../API/GetAllStudentsApi";

function PreviewResume() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("studentToken");
    if (!token) {
      navigate("/");
    }
  }, []);
  const apiUrl = " /api/v1/users/get-user";
  const { students } = GetAllStudents(apiUrl);
  return (
    <div className="bg-white flex-col mt-4 mb-4 mr-10 h-[550px] rounded-lg shadow-md justify-center flex place-items-center">
      <h1 className="text-blue-600 font-bold text-lg">YOUR RESUME</h1>
      <div className=" flex-col  h-[450px] w-[880px] p-4 justify-items-center rounded-lg overflow-y-scroll no-scrollbar flex place-items-center justify-center">
        <div className="pdf shows here flex flex-col  p-8 w-[380px] rounded-lg bg-gray-100 h-[370px] mb-8 font-medium">
          <h1 className="text-center">Your Resume Display here....!</h1>
          <div className="mt-24 text-center">
            <a
              target="_blank"
              className="font-bold hover:underline"
              href={students.resume}
            >
              CLICK HERE TO VIEW YOUR RESUME
            </a>
          </div>
        </div>
        <Link to="/updateresume">
          <button className="bg-blue-600 px-8 rounded-lg text-xs font-semibold mt-4 text-white py-2">
            UPDATE
          </button>
        </Link>
      </div>
    </div>
  );
}

export default PreviewResume;
