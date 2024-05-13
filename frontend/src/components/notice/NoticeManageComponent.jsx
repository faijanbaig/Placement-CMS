import { useState } from "react";
import PropTypes from "prop-types";
import { MdOutlineCancel } from "react-icons/md";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function NoticeManageComponent({ admin, setAdmin }) {
  const [openNoticeId, setOpenNoticeId] = useState(null);
  const [openedNotices, setOpenedNotices] = useState([]);

  const toggleNotice = (noticeId) => {
    setOpenNoticeId(openNoticeId === noticeId ? null : noticeId);
    if (!openedNotices.includes(noticeId)) {
      setOpenedNotices([...openedNotices, noticeId]);
    }
  };

  // Function to format date
  const formatDate = (dateString) => {
    return dateString.slice(0, 10);
  };
  const handleDeleteClick = async (noticeId) => {
    try {
      await axios.delete(`https://placement-cms.onrender.com/api/v1/users/delete-notice/${noticeId}`);
      setAdmin(admin.filter((data) => data._id !== noticeId));
      toast.success("Notice deleted successfully!");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="grid place-items-center">
      {admin.map((data) => (
        <div
          key={data._id}
          className={`bg-blue-100 w-[600px]  px-2 mb-4 rounded-md ${
            openNoticeId === data._id
              ? "hover:border-b hover:border-blue-500"
              : ""
          }`}
        >
          <div className="flex place-items-center mt-3  sticky top-0 mb-2 ">
            <div className="mx-4 text-sm font-semibold whitespace-nowrap flex place-items-center justify-between w-full">
              <div
                className="cursor-pointer"
                onClick={() => toggleNotice(data._id)}
              >
                {data.title}
              </div>
              <div className="flex place-items-center">
                <span className="text-xs ml-4 mr-4">
                  {formatDate(data.createdAt)}
                </span>
                <MdOutlineCancel
                  onClick={() => handleDeleteClick(data._id)}
                  className="text-red-500 text-xl cursor-pointer"
                />
              </div>
            </div>
          </div>
          {openNoticeId === data._id && (
            <div className="p-4 border-t border-gray-300">
              <p className="text-sm">{data.message}</p>
              <div className="h-20"></div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
NoticeManageComponent.propTypes = {
  admin: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      createdAt: PropTypes.string.isRequired,
      message: PropTypes.string.isRequired,
    })
  ).isRequired,
  setAdmin: PropTypes.func.isRequired,
};
export default NoticeManageComponent;
