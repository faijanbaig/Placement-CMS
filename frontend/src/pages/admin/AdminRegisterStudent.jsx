import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { REACT_APP_BACKEND_URL } from "../../../variable";
function AdminRegisterStudent() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      navigate("/");
    }
  }, []);

  const [studentData, setStudentData] = useState({
    fullName: "",
    enrollment: "",
    email: "",
    password: "",
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
         `${REACT_APP_BACKEND_URL}/api/v1/users/register-student`,
        studentData
      );
      response.data;
      toast.success("Student created successfully!");
      // console.log("Student created:", response.data.data);
      setStudentData({
        fullName: "",
        enrollment: "",
        email: "",
        password: "",
      });
    } catch (error) {
      console.error("Error creating student:", error.response.data.message);
      toast.error("Error creating student. Please try again.");
    }
    setLoading(false);
  };
  return (
    <div className="mt-4 h-[550px] ml-64 bg-white mb-4 w-[480px] rounded-lg shadow-md">
      <div className="bg-white border-b border-black justify-center mx-3 flex place-items-center h-10">
        <h2 className="pl-3 font-bold text-blue-500">Register student</h2>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="  h-[300px] ml-8 mt-12 mr-8 flex flex-col mb-12 ">
          <label className="text-xs text-blue-500 font-bold font-sans">
            Full Name
          </label>
          <input
            id="fullName"
            name="fullName"
            onChange={handleChange}
            value={studentData.fullName}
            className="p-2 my-0.5  bg-gray-100 outline-none rounded-md mb-2"
            type="text"
            placeholder="Full Name"
            required
          />
          <label className="text-xs text-blue-500 font-bold font-sans">
            Enrollment
          </label>
          <input
            id="enrollment"
            name="enrollment"
            onChange={handleChange}
            value={studentData.enrollment}
            className="p-2 my-0.5  bg-gray-100 outline-none rounded-md mb-2"
            type="text"
            placeholder="Erollment"
            required
          />
          <label className="text-xs text-blue-500 font-bold font-sans">
            Email
          </label>
          <input
            id="email"
            name="email"
            onChange={handleChange}
            value={studentData.email}
            className="p-2 my-0.5  bg-gray-100 outline-none rounded-md mb-2"
            type="text"
            placeholder="Email"
            required
          />
          <label className="text-xs text-blue-500 font-bold font-sans">
            Password
          </label>
          <input
            id="password"
            name="password"
            onChange={handleChange}
            value={studentData.password}
            className="p-2 my-0.5  bg-gray-100 outline-none rounded-md "
            type="text"
            placeholder="Password"
            required
          />
        </div>
        <div className=" flex  justify-evenly mt-4 mb-4">
          {loading ? (
            <div className="loader bg-red-600 px-8 rounded-lg text-xs font-semibold text-white py-2">
              CREATING...
            </div> // Add your loading spinner here
          ) : (
            <button
              type="submit"
              className="bg-blue-600 px-8 rounded-lg text-xs font-semibold text-white py-2"
            >
              CREATE STUDENT ACCOUNT
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default AdminRegisterStudent;
