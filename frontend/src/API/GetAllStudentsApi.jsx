import { useState, useEffect } from "react";
import axios from "axios";

const GetAllStudents = (url) => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(url);
      setStudents(response.data.data);
      setError(null);
    } catch (error) {
      setError("An error occurred while fetching data.");
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();

    return () => {
      setStudents([]);
    };
  }, [url]); 

  const refetch = (callback) => {
    fetchData().then(() => {
      if (typeof callback === "function") {
        callback();
      }
    });
  };

  return { students, setStudents, loading, error, refetch };
};

export default GetAllStudents;
