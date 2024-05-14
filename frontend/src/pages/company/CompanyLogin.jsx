import { Link, useNavigate } from "react-router-dom";
import { RiEyeCloseFill, RiEyeFill, RiUserLine } from "react-icons/ri";
import { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  loginStart,
  loginSuccess,
  loginFailure,
} from "../../redux/user/userSlice";
import { REACT_APP_BACKEND_URL } from "../../../variable";

function CompanyLogin() {
  const [FormData, setFormData] = useState({ email: "", password: "" });
  const { loading, error: errorMessage } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const handleChange = (e) => {
    setFormData({ ...FormData, [e.target.id]: e.target.value.trim() });
  };
  // via axios
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!FormData.email || !FormData.password) {
      return dispatch(loginFailure("All fields are required"));
    }
    try {
      dispatch(loginStart());
      const res = await axios.post(
         `${REACT_APP_BACKEND_URL}/api/v2/companies/login-company`,
        FormData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      const data = res.data; // Access data directly from the response
      if (data.success === false) {
        // console.log(data);
      } else {
        dispatch(loginSuccess(data));
        const companyRole = data.data.loggedInCompany.role;
        if (companyRole === "company") {
          navigate("/companyhome");
          localStorage.setItem("companyToken", data.data.accessToken);
          window.location.reload();
        } else {
          console.error("unexpected company role: "), companyRole;
        }
      }
    } catch (error) {
      dispatch(loginFailure("Email or Password is Invalid"));
    }
  };

  return (
    <div className=" w-full grid place-items-center">
      <div className="bg-white h-[500px] w-[300px] shadow-md rounded-lg drop-shadow-sm mt-10 mb-10 ">
        <div className="flex place-items-center justify-center  mt-12 ">
          <RiUserLine className="text-xl text-[#33363F] font-semibold" />
          <h4 className="text-blue-500 font-bold ml-2">Company Login</h4>
        </div>
        <div className="flex flex-col place-content-center">
          <form
            className=" flex flex-col justify-center"
            onSubmit={handleSubmit}
          >
            <input
              className="m-5 p-3 shadow-sm bg-gray-100 outline-none rounded-lg mt-16"
              type="text"
              placeholder="Email"
              id="email"
              // autoComplete="email"
              value={FormData.email}
              onChange={handleChange}
            />
            <input
              className="m-5 p-3 shadow-sm bg-gray-100 outline-none rounded-lg mt-0.5 pr-10"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              id="password"
              autoComplete="password"
              value={FormData.password}
              onChange={handleChange}
              style={{ paddingRight: "40px" }}
            />
            <span
              className="text-blue-500 text-xl absolute right-8 top-[46.5%] transform -translate-y-1/2 cursor-pointer" // Position the icon vertically centered within the input
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <RiEyeCloseFill /> : <RiEyeFill />}
            </span>
            <button
              className="bg-gray-100 text-gray-500 mx-auto mt-3 pl-5 pr-5 p-0.5 rounded-md"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span>Submitting...</span>
                </>
              ) : (
                "Login"
              )}
            </button>
          </form>
          <p className="mx-auto mt-8 text-gray-500">
            For College!
            <Link to="/">
              <span className="text-blue-500  ml-1 hover:text-blue-600 font-bold">
                Login
              </span>
            </Link>
          </p>

          {errorMessage && (
            <p className="text-red-600 bg-gray-100 mx-auto mt-5 p-2 rounded-lg">
              {errorMessage}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default CompanyLogin;
