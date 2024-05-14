import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import GetAllStudents from "../../API/GetAllStudentsApi";
import NoticeComponent from "../../components/notice/NoticeComponent";
import { REACT_APP_BACKEND_URL } from "../../../variable";

function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("studentToken");
    if (!token) {
      navigate("/");
    }
  }, []);
  const apiUrl = `${REACT_APP_BACKEND_URL}/api/v1/users/get-all-notices`;
  const { students } = GetAllStudents(apiUrl);
  return (
    <div className="bg-white flex-col mt-4 mb-4 mr-10 h-[550px] rounded-lg shadow-md justify-center flex place-items-center">
      <h1 className="text-blue-600 font-bold text-lg">NOTICE</h1>
      <div className="h-[450px] w-full p-4 justify-items-center rounded-lg  overflow-y-scroll no-scrollbar">
        {/* feedback component */}
        <NoticeComponent admin={students} />
      </div>
    </div>
  );
}

export default Home;
