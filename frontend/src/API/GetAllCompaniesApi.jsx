import { useState, useEffect } from "react";
import axios from "axios";

const GetAllCompanies = (url) => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(url);
        setCompanies(response.data.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();

    return () => {
      setCompanies([]);
    };
  }, [url]);

  return { companies, loading, error };
};

export default GetAllCompanies;
