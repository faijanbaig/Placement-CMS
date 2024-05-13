import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import FeedbackComponent from "../../components/feedback/FeedbackComponent";
import GetAllStudents from "../../API/GetAllStudentsApi";
import axios from "axios";
import Warning from "../../components/Warning";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function AdminFeedbacks() {
  const navigate = useNavigate();
  const [isWarningModalOpen, setWarningModalOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      navigate("/");
    }
  }, []);
  const apiUrl = `https://placement-cms.onrender.com/api/v4/feedback/get-all-feedbacks`;
  const { students, setStudents } = GetAllStudents(apiUrl);

  const handleDelete = async () => {
    try {
      await axios.delete(`https://placement-cms.onrender.com/api/v4/feedback/delete-all-feedbacks`);
      console.log("Feedbacks deleted successfully");
      toast.success("All feedbacks are deleted!");

      setStudents([]);
      setWarningModalOpen(false);
    } catch (error) {
      console.log("Error deleting student:", error);
    }
  };
  return (
    <div className="bg-white flex-col mt-4 mb-4 mr-10 h-[550px] rounded-lg shadow-md justify-center flex place-items-center">
      <h1 className="text-blue-600 font-bold text-lg">FEEDBACKS</h1>
      <div className="h-[450px]   p-4 justify-items-center rounded-lg  overflow-y-scroll no-scrollbar">
        {/* feedback component */}
        <FeedbackComponent students={students} />
      </div>
      <button
        onClick={() => setWarningModalOpen(true)}
        className="bg-red-600 px-8 rounded-lg text-xs font-semibold text-white py-2"
      >
        DELETE ALL FEEDBACKS
      </button>
      <Warning
        isOpen={isWarningModalOpen}
        onClose={() => setWarningModalOpen(false)}
        onDelete={handleDelete}
      />
    </div>
  );
}

export default AdminFeedbacks;
