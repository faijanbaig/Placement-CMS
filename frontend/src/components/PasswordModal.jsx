import { useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { toast } from "react-toastify";

const PasswordModal = ({ isOpen, onClose }) => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    try {
      await axios.patch( `/api/v1/users/change-password`, {
        oldPassword,
        newPassword,
      });
      toast.success("Successfully changed password!");
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setError(null);
      onClose();
    } catch (error) {
      toast.error("Failed to change password!");
    }
  };

  return (
    <>
      {isOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white flex place-items-center justify-center h-[600px] w-[850px] p-4 rounded-md">
            <div className="bg-gray-100 h-[540px] w-[330px] flex flex-col place-items-center rounded-lg shadow-md shadow-gray-400">
              <p className="text-lg font-bold mt-4  mb-8 flex justify-center text-blue-500">
                CHANGE YOUR PASSWORD
              </p>
              <form onSubmit={handleSubmit}>
                <div className="mb-4 mt-4">
                  <label className="block text-xs font-bold text-blue-500">
                    Current password
                  </label>
                  <input
                    placeholder="Current password"
                    type="password"
                    className="mt-0.5 p-2  outline-none rounded-lg block w-full "
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-xs  font-bold text-blue-500">
                    New password
                  </label>
                  <input
                    placeholder="New password"
                    type="password"
                    className="mt-0.5 p-2  outline-none rounded-lg block w-full"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs  font-bold text-blue-500">
                    Confirm new password
                  </label>
                  <input
                    placeholder="Confirm new password"
                    type="password"
                    className="mt-0.5 p-2  outline-none rounded-lg block w-full"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>
                {error && <p className="text-red-500">{error}</p>}
                <div className="flex place-items-center ml-5">
                  <button
                    type="submit"
                    className="bg-blue-600 px-8 mr-6 mt-20 rounded-lg text-xs font-semibold text-white py-2"
                  >
                    CHANGE
                  </button>
                  <button
                    type="button"
                    className="bg-red-600 px-8 mr-6 mt-20 rounded-lg text-xs font-semibold text-white py-2"
                    onClick={onClose}
                  >
                    CANCEL
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

PasswordModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default PasswordModal;
