import { useEffect, useState } from "react";
import axios from "axios";
import { REACT_APP_BACKEND_URL } from "../../variable";

const CollegeApi = () => {
  const [userRole, setUserRole] = useState("");
  const [companyRole, setCompanyRole] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get( `${REACT_APP_BACKEND_URL}/api/v1/users/get-user`);
        setUserRole(response.data.data.role);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchCompanyData = async () => {
      try {
        const response = await axios.get(
          `${REACT_APP_BACKEND_URL}/api/v2/companies/get-current-company-details`
        );
        setCompanyRole(response.data.data.role);
      } catch (error) {
        console.error("Error fetching company data:", error);
      }
    };

    fetchCompanyData();
  }, []);

  return { userRole, companyRole };
};

export default CollegeApi;
