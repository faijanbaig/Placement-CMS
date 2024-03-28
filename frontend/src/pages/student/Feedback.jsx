import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Feedback() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
    }
  }, []);
  return <div></div>;
}

export default Feedback;
