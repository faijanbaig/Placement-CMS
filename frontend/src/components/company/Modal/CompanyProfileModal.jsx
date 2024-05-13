import axios from "axios";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { CgProfile } from "react-icons/cg";
import { MdEdit } from "react-icons/md";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CompanyProfileModal = ({ isOpen, onClose }) => {
  const [isloading, setIsLoading] = useState(false);
  const [values, setValues] = useState({
    avatar: "",
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
        console.error("Error fetching company details:", error);
      }
    };

    fetchStudentDetails(); // Fetch student details when component mounts
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setValues((prevValues) => ({
      ...prevValues,
      avatar: file,
    }));
  };

  const handleSave = async (e) => {
    e.preventDefault(); // Prevent default form submission
    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append("avatar", values.avatar);
      await axios.patch( `/api/v2/companies/update-company-avatar`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Company avatar updated successfully");
      onClose();
      window.location.reload();
    } catch (error) {
      console.error("Error updating company avatar details:", error);
      toast.error("Error updating avatar. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white flex flex-col place-items-center p-12 h-[500px] w-[750px] rounded-md">
            <div className="bg-gray-100 h-[550px] w-[300px] flex flex-col place-items-center rounded-lg shadow-md shadow-gray-400">
              <p className="text-lg font-bold mt-4 mb-8 justify-center flex text-blue-500">
                CHANGE YOUR AVATAR
              </p>
              <div>
                {values.avatar ? (
                  <img
                    src={values.avatar}
                    className="h-28 w-28 rounded-full "
                    alt="image"
                  />
                ) : (
                  <CgProfile className="h-28 w-28 text-blue-400" />
                )}
              </div>
              <div className="flex place-items-center mt-4">
                <label htmlFor="avatar" className="flex place-items-center">
                  <MdEdit />
                  <p className="ml-1 text-md cursor-pointer text-blue-500 font-bold">
                    Edit
                  </p>
                </label>
                <input
                  id="avatar"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  style={{ display: "none" }}
                />
              </div>
              <div>
                <button
                  type="submit"
                  onClick={handleSave}
                  className="bg-blue-600 px-8 mr-6 mt-20 rounded-lg text-xs font-semibold text-white py-2"
                >
                  {isloading ? "Loading..." : "UPDATE"}
                </button>
                <button
                  onClick={onClose}
                  className="bg-red-600 px-8 rounded-lg text-xs font-semibold text-white py-2"
                >
                  CANCEL
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
CompanyProfileModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default CompanyProfileModal;
