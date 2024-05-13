import axios from "axios";
import { useEffect, useState } from "react";
import { CgProfile } from "react-icons/cg";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PropTypes from "prop-types";
function CompanyProfileUpdate({ onCancel }) {
  const [isloading, setIsLoading] = useState(false);
  const [values, setValues] = useState({
    name: "",
    email: "",
    website: "",
    address: "",
    description: "",
  });

  useEffect(() => {
    const fetchStudentDetails = async () => {
      try {
        const res = await axios.get(
           `/api/v2/companies/get-current-company-details`
        );
        const studentData = res.data.data;
        setValues(studentData); // Set the retrieved student details in the state
      } catch (error) {
        console.error("Error fetching student details:", error);
      }
    };

    fetchStudentDetails(); // Fetch student details when component mounts
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleDetailsSave = async (e) => {
    e.preventDefault(); // Prevent default form submission
    setIsLoading(true);

    try {
      const updatedData = {
        name: values.name,
        email: values.email,
        address: values.address,
        website: values.website,
        description: values.description,
      };

      await axios.patch(
         `/api/v2/companies/update-company-details`,
        updatedData
      );
      toast.success("Company details updated successfully");
      onCancel();
    } catch (error) {
      console.error("Error updating company details:", error);
      toast.error("Error updating company details. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form>
      <div className="bg-white flex-col mt-4 mb-4 mr-10 h-[550px] rounded-lg shadow-md justify-center flex place-items-center">
        <div className="shadow-gray-400 mt-4 h-[570px] bg-gray-100 mb-4 w-[380px] rounded-lg shadow-md overflow-y-scroll no-scrollbar">
          <div className="sticky top-0 bg-gray-100 border-b mt-1 border-black  mx-3 flex place-items-center h-10">
            <h2 className="pl-3 font-bold text-blue-500">
              Update company details
            </h2>
          </div>
          <div className="flex flex-col place-items-center place-content-center hover:underline justify-center mt-3 mb-2 ">
            <div>
              {values.avatar ? (
                <img
                  src={values.avatar}
                  className="h-20 w-20 rounded-full"
                  alt="image"
                />
              ) : (
                <CgProfile className="h-20 w-20 text-blue-500" />
              )}
            </div>
          </div>

          <div className=" h-[300px] custom-scrollbar overflow-y-scroll">
            <div className="flex justify-evenly mt-3 ml-6 ">
              <table className="w-full mt-3">
                <tbody>
                  <tr>
                    <td className="font-semibold text-sm p-1 whitespace-nowrap">
                      Name :
                    </td>
                    <td>
                      <input
                        type="text"
                        name="name"
                        onChange={handleChange}
                        value={values.name}
                        className=" shadow-sm bg-blue-100 outline-none rounded-md px-2 font-semibold text-sm "
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="font-semibold text-sm p-1 whitespace-nowrap">
                      Email :
                    </td>
                    <td>
                      <input
                        type="text"
                        name="email"
                        onChange={handleChange}
                        value={values.email}
                        className=" shadow-sm bg-blue-100 outline-none rounded-md px-2 font-semibold text-sm mt-1 "
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="font-semibold text-sm p-1 whitespace-nowrap">
                      Website :
                    </td>
                    <td>
                      <input
                        type="text"
                        name="website"
                        onChange={handleChange}
                        value={values.website}
                        className=" shadow-sm bg-blue-100 outline-none rounded-md px-2 font-semibold text-sm mt-1 "
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="font-semibold text-sm p-1 whitespace-nowrap">
                      Description :
                    </td>
                    <td>
                      <input
                        type="tel"
                        name="description"
                        value={values.description}
                        onChange={handleChange}
                        className=" shadow-sm bg-blue-100 outline-none rounded-md px-2 font-semibold text-sm mt-1 "
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="font-semibold text-sm p-1 whitespace-nowrap">
                      Address :
                    </td>
                    <td>
                      <input
                        type="text"
                        name="address"
                        value={values.address}
                        onChange={handleChange}
                        className=" shadow-sm bg-blue-100 outline-none rounded-md px-2 font-semibold text-sm mt-1 "
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="btns flex  justify-evenly mt-4 mb-2">
            <button
              type="submit"
              onClick={handleDetailsSave}
              className="bg-blue-600 px-8 rounded-lg text-xs font-semibold text-white py-2"
              disabled={isloading}
            >
              {isloading ? "Loading..." : "SAVE"}
            </button>
            <button
              onClick={onCancel}
              className="bg-red-600 px-8 rounded-lg text-xs font-semibold text-white py-2"
            >
              CANCEL
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
CompanyProfileUpdate.propTypes = {
  onCancel: PropTypes.func.isRequired,
};

export default CompanyProfileUpdate;
