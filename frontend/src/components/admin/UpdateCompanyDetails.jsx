/* eslint-disable react/prop-types */
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function UpdateCompanyDetails({ companyId, onCancel }) {
  const [values, setValues] = useState({
    id: companyId,
    name: "",
    email: "",
    website: "",
    address: "",
    description: "",
  });

  useEffect(() => {
    const fetchCompanyDetails = async () => {
      try {
        const res = await axios.get(
          ` /api/v2/companies/get-company-details/${companyId}`
        );
        const companyData = res.data.data;
        setValues(companyData); // Set the retrieved student details in the state
      } catch (error) {
        console.error("Error fetching company details:", error);
      }
    };

    fetchCompanyDetails(); // Fetch student details when component mounts
  }, [companyId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSave = async (e) => {
    e.preventDefault(); // Prevent default form submission

    try {
      const updatedData = {
        name: values.name,
        email: values.email,
        address: values.address,
        website: values.website,
        description: values.description,
      };

      await axios.patch(
        ` /api/v2/companies/update-company-details/${companyId}`,
        updatedData
      );
      toast.success("Student details updated successfully");

      // console.log("Company details updated successfully");
      onCancel();
      window.location.reload();
    } catch (error) {
      console.error("Error updating company details:", error);
      toast.error("Error updating student details. Please try again.");
    }
  };

  return (
    <form>
      <div className=" ml-4 mt-4 h-[550px] bg-white mb-4 w-[380px] rounded-lg shadow-xl overflow-y-scroll no-scrollbar">
        <div className="sticky top-0 bg-transparent border-b mt-1 border-black  mx-3 flex place-items-center h-10">
          <h2 className="pl-3 font-bold text-blue-400">
            Update company details
          </h2>
        </div>
        <div className="flex justify-center mt-3 mb-2  ">
          <img
            src={values.avatar}
            className="h-20 w-20 rounded-full border "
            alt="image"
          />
        </div>
        <div className=" h-[330px] custom-scrollbar overflow-y-scroll">
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
                      className=" shadow-sm bg-gray-100 outline-none rounded-md px-2 font-semibold text-sm "
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
                      className=" shadow-sm bg-gray-100 outline-none rounded-md px-2 font-semibold text-sm mt-1 "
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
                      className=" shadow-sm bg-gray-100 outline-none rounded-md px-2 font-semibold text-sm mt-1 "
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
                      className=" shadow-sm bg-gray-100 outline-none rounded-md px-2 font-semibold text-sm mt-1 "
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
                      className=" shadow-sm bg-gray-100 outline-none rounded-md px-2 font-semibold text-sm mt-1 "
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="btns flex  justify-evenly mt-4 mb-4">
          <button
            type="submit"
            onClick={handleSave}
            className="bg-blue-600 px-8 rounded-lg text-xs font-semibold text-white py-2"
          >
            SAVE
          </button>
          <button
            onClick={onCancel}
            className="bg-red-600 px-8 rounded-lg text-xs font-semibold text-white py-2"
          >
            CANCEL
          </button>
        </div>
      </div>
    </form>
  );
}

export default UpdateCompanyDetails;
