import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function UpdateResume() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("studentToken");
    if (!token) {
      navigate("/");
    }
  }, []);
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpdate = async () => {
    try {
      const formData = new FormData();
      formData.append("resume", file);
      setLoading(true);

      // Modify the URL according to your API endpoint
      const response = await axios.patch(
        `https://placement-cms.onrender.com/api/v1/users/update-student-resume`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast.success("Resume updated successfully!");
      console.log("File updated successfully:", response.data);
      // Add any additional actions you want to perform after updating the file
    } catch (error) {
      toast.error("Error occurred while uploading resume, try again!");
      console.error("Error updating file:", error);
      // Handle error scenarios here
    }
    setLoading(false);
  };
  return (
    <div className="bg-white flex-col mt-4 mb-4 mr-10 h-[550px] rounded-lg shadow-md justify-center flex place-items-center">
      <h1 className="text-blue-600 font-bold text-lg">UPLOAD YOUR RESUME</h1>
      <div className=" flex-col  h-[450px] w-[880px] p-4 justify-items-center rounded-lg overflow-y-scroll no-scrollbar flex place-items-center justify-center">
        <div className="resume h-[380px] ">
          <input
            type="file"
            onChange={handleFileChange}
            className="pdf goes here p-8 outline-none bg-gray-100 h-[350px] rounded-lg mb-8 font-medium"
          ></input>
        </div>
        {loading ? (
          <div className="loader bg-red-600 px-8 rounded-lg text-xs font-semibold text-white py-2">
            SUBMITING...
          </div> // Add your loading spinner here
        ) : (
          <button
            onClick={handleUpdate}
            disabled={!file}
            className="bg-blue-600 px-8 rounded-lg text-xs font-semibold text-white py-2"
          >
            SUBMIT
          </button>
        )}
      </div>
    </div>
  );
}

export default UpdateResume;
