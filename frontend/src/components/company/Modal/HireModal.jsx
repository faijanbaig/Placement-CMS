import PropTypes from "prop-types";
const HireModal = ({ isOpen, onClose, unHireAll }) => {
  return (
    <>
      {isOpen && (
        <div className="fixed top-0 left-0 z-10 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-5 rounded-md">
            <p className="text-lg font-semibold mb-4">
              Are you sure you want to Unhire All !
            </p>
            <div className="flex justify-end">
              <button
                className="text-red-500 mr-2 py-1 px-2 rounded-full border border-red-600 hover:font-bold hover:underline cursor-pointer"
                onClick={unHireAll}
              >
                UNHIRE All
              </button>
              <button
                className="text-blue-500 py-1 px-2 rounded-full border border-blue-600  hover:underline hover:font-bold cursor-pointer"
                onClick={onClose}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

HireModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  unHireAll: PropTypes.func.isRequired,
};
export default HireModal;
