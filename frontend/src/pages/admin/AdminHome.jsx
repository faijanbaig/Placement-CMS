import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { REACT_APP_BACKEND_URL } from "../../../variable";

function AdminHome() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      navigate("/");
    }
  }, []);

  const [studentData, setStudentData] = useState({
    message: "",
    title: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudentData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
         `${REACT_APP_BACKEND_URL}/api/v1/users/publish-new-notice`,
        studentData
      );
      response.data;
      toast.success("Notice send successfully!");
      setStudentData({
        message: "",
        title: "",
      });
    } catch (error) {
      console.error("Error submitting Notice:", error.response.data.message);
      toast.error("Error sending Notice. Please try again.");
    }
    setLoading(false);
  };
  return (
    <div className="bg-white flex-col my-4 mr-10 h-[550px] rounded-lg shadow-md justify-center flex place-items-center">
      <h1 className="text-blue-600 font-bold text-lg">
        SEND NOTICE TO ALL STUDENTS
      </h1>
      <div className="h-[450px] w-full p-4 justify-items-center rounded-lg overflow-y-scroll no-scrollbar flex place-items-center justify-center">
        <div className="forming h-[380px] w-[460px]">
          <form
            onSubmit={handleSubmit}
            className="flex  flex-col justify-center place-items-center"
          >
            <input
              name="title"
              id="title"
              onChange={handleChange}
              value={studentData.title}
              required
              placeholder="Title of the notice..."
              type="text"
              className="mb-2 w-[640px] px-8 font-semibold bg-blue-100 p-4 rounded-lg outline-none  "
            />
            <textarea
              className="p-8 outline-none  w-[640px]  bg-gray-100 rounded-lg mb-8 font-medium"
              name="message"
              id="message"
              onChange={handleChange}
              rows="6"
              required
              value={studentData.message}
              placeholder="Write notice for all students..."
            ></textarea>
            {loading ? (
              <div className="loader  bg-red-600 px-8 rounded-lg text-xs font-semibold text-white py-2">
                SENDING...
              </div>
            ) : (
              <button
                type="submit"
                className="bg-blue-600 px-6 rounded-lg text-sm  font-semibold text-white py-2"
              >
                SEND
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default AdminHome;
