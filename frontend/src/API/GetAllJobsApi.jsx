import { useState, useEffect } from "react";
import axios from "axios";

const GetAllJobs = (url) => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(url);
        setJobs(response.data.data);
        console.log(response);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();

    return () => {
      setJobs([]);
    };
  }, [url]);

  return { jobs, loading, error };
};

export default GetAllJobs;
