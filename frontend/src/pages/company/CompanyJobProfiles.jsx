import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function CompanyJobProfiles() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("companyToken");
    if (!token) {
      navigate("/");
    }
  }, []);
  return (
    <div className="bg-white h-[550px] shadow-md rounded-lg  w-[1080px] m-4 ">
      <div></div>
    </div>
  );
}

export default CompanyJobProfiles;
