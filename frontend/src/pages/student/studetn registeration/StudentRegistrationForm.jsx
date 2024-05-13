import { useState } from "react";
import axios from "axios";
import { RiEyeCloseFill, RiEyeFill } from "react-icons/ri";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
const StudentRegistrationForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [loading, setLoading] = useState(false);
  const [otpGenerating, setOtpGenerating] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const [formData, setFormData] = useState({
    fullName: "",
    enrollment: "",
    email: "",
    password: "",
    confirmPassword: "",
    otp: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleVerificationCode = async () => {
    try {
      // Check if the email contains ".ies@ipsacademy.org"
      if (!formData.email.includes(".ies@ipsacademy.org")) {
        toast.error("Please use a valid college email.");
        return;
      }
      setOtpGenerating(true);
      // to generate and send  verification OTP
      await axios.post(`${import.meta.env.REACT_APP_BACKEND_URL}/api/v1/users/generate-otp-email-for-student`, {
        email: formData.email,
      });
      toast.success("Verification code sent to your email.");
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to send verification code. Please try again later.");
    }
    setOtpGenerating(false);
  };

  const handleVerifyOTP = async () => {
    try {
      const { email, otp } = formData;
      const otpNumber = parseInt(otp);

      // Send the verification code and email to backend for verification
      const response = await axios.post(
        `${import.meta.env.REACT_APP_BACKEND_URL}/api/v1/users/verify-email-for-student`,
        {
          email,
          otpNumber,
        }
      );
      console.log(response.data);
      setIsVerified(true);
      toast.success("Email verified successfully.");
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to verify OTP. Please try again.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }
    if (!isVerified) {
      toast.error("Please verify your email first!");
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post(
        `${import.meta.env.REACT_APP_BACKEND_URL}/api/v1/users/register-student`,
        formData
      );
      response.data;
      toast.success("Student registered successfully!");
      // console.log("Student created:", response.data.data);
      setFormData({
        fullName: "",
        enrollment: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
      setIsVerified(false);
    } catch (error) {
      //   console.error("Error registering student:", error.response.data.message);
      toast.error("Error registering student. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="w-full min-h-screen grid place-items-center">
      <form
        onSubmit={handleSubmit}
        className="w-[330px] h-[570px] mt-12 p-4 flex flex-col bg-white mb-12 rounded-md shadow-md relative"
      >
        <h1 className="grid place-items-center  text-blue-600 font-semibold mb-6">
          Registeration
        </h1>
        <p className="text-blue-800 font-bold grid place-items-center -mt-4 text-xs">
          Only for student !
        </p>
        <label className="block mb-4  text-blue-500 font-bold text-xs">
          Name:
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            className="form-input mt-1 outline-none p-2 rounded-md  bg-blue-100 block w-full text-black font-semibold"
            required
          />
        </label>
        <label className="block mb-4 text-blue-500 font-bold text-xs">
          Enrollment:
          <input
            type="text"
            name="enrollment"
            value={formData.enrollment}
            onChange={handleChange}
            className="form-input mt-1 outline-none p-2 rounded-md  bg-blue-100 block w-full text-black font-semibold"
            required
          />
        </label>

        <label className="block mb-4 text-blue-500 font-bold text-xs">
          College email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            readOnly={isVerified} // Make email input read-only if isVerified is true
            className="form-input bg-blue-100 mt-1 outline-none p-2 rounded-md block w-full text-black font-semibold"
            required
          />
        </label>
        {!isVerified && (
          <>
            {otpGenerating ? (
              <div className="text-blue-800 mx-auto -mt-3 text-xs font-bold rounded">
                Generating...
              </div>
            ) : (
              <button
                type="button"
                onClick={handleVerificationCode}
                className="text-blue-700 hover:underline mx-auto -mt-3 text-xs font-bold rounded"
                disabled={isVerified} // Disable button if isVerified is true
              >
                Generate OTP
              </button>
            )}
          </>
        )}

        {!isVerified && ( // Render verify OTP section only if isVerified is false
          <label className="block mb-4 text-blue-500 font-bold text-xs">
            Verify OTP:
            <input
              type="text"
              name="otp"
              value={formData.otp}
              onChange={handleChange}
              className="form-input mt-1 outline-none p-2 rounded-md bg-blue-100 block w-full text-black font-semibold"
              required
            />
            <button
              onClick={handleVerifyOTP}
              className="text-blue-700 hover:underline hover:text-blue-800 absolute right-7 top-[54%] transform -translate-y-1/2"
            >
              Verify
            </button>
          </label>
        )}

        <label className="block mb-4 relative text-blue-500 font-bold text-xs">
          Password:
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="form-input mt-1 outline-none p-2 rounded-md  bg-blue-100 block w-full text-black font-semibold"
            required
          />
          <span
            className="text-blue-500 text-xl absolute right-2 top-[69%] transform -translate-y-1/2 cursor-pointer" // Position the icon vertically centered within the input
            onClick={togglePasswordVisibility}
          >
            {showPassword ? <RiEyeCloseFill /> : <RiEyeFill />}
          </span>
        </label>
        <label className="block mb-4 text-blue-500 font-bold text-xs">
          Confirm Password:
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="form-input mt-1 outline-none p-2 rounded-md  bg-blue-100 block w-full text-black font-semibold"
            required
          />
        </label>
        {loading ? (
          <div className="bg-red-600 mx-auto font-semibold text-xs mt-4 text-white py-2 px-4 rounded-md">
            Registering...
          </div>
        ) : (
          <button
            type="submit"
            className="bg-blue-600 mx-auto font-semibold text-xs mt-4 text-white py-2 px-4 rounded-md hover:bg-green-600"
          >
            Register
          </button>
        )}

        <p className="flex justify-center mb-4 text-xs mt-3 font-bold">
          Go to login page!
          <Link to="/">
            <span className="ml-2 text-blue-700 cursor-pointer hover:underline">
              click here
            </span>
          </Link>
        </p>
      </form>
    </div>
  );
};

export default StudentRegistrationForm;
