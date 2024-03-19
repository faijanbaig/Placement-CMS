import { useEffect } from "react";
import Navbar from "../../components/Navbar";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/");
    }
  });
  return (
    <>
      <div className="flex w-full flex-col bg-[#e9f1ef]">
        <Navbar />
        <h1>student home</h1>
      </div>
    </>
  );
}

export default Home;
