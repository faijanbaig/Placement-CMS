import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function CompanyFeedback() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("companyToken");
    if (!token) {
      navigate("/");
    }
  }, []);

  const [studentData, setStudentData] = useState({
    content: "",
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
        `https://placement-cms.onrender.com/api/v4/feedback/write-new-company-feedback`,
        studentData
      );
      response.data;
      toast.success("Feedback send successfully!");
      setStudentData({
        content: "",
      });
    } catch (error) {
      console.error("Error sending feedback:", error.response.data.message);
      toast.error("Error sending feedback. Please try again.");
    }
    setLoading(false);
  };
  return (
    <div className="bg-white flex-col my-4 mr-10 h-[550px] rounded-lg shadow-md justify-center flex place-items-center">
      <h1 className="text-blue-600 font-bold text-lg">FEEDBACK</h1>
      <div className="h-[450px] w-[880px] p-4 justify-items-center rounded-lg overflow-y-scroll no-scrollbar flex place-items-center justify-center">
        <div className="forming h-[380px] w-[460px]">
          <form
            onSubmit={handleSubmit}
            className="flex  flex-col justify-center place-items-center"
          >
            <textarea
              className="p-8 outline-none bg-gray-100 rounded-lg mb-8 font-medium"
              name="content"
              id="content"
              onChange={handleChange}
              cols="50"
              rows="10"
              required
              value={studentData.content}
              placeholder="Write your feedback here..."
            ></textarea>
            {loading ? (
              <div className="loader  bg-red-600 px-8 rounded-lg text-xs font-semibold text-white py-2">
                SUBMITTING...
              </div>
            ) : (
              <button
                type="submit"
                className="bg-blue-600 px-8 rounded-lg text-xs font-semibold text-white py-2"
              >
                SUBMIT
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default CompanyFeedback;
