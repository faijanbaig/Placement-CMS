import { useEffect, useState } from "react";
import axios from "axios";

const CollegeApi = () => {
  const [userRole, setUserRole] = useState("");
  const [companyRole, setCompanyRole] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://placement-cms.onrender.com/api/v1/users/get-user`);
        setUserRole(response.data.data.role);
        console.log(userRole);
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
          `https://placement-cms.onrender.com/api/v2/companies/get-current-company-details`
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
