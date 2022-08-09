import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import 'animate.css';
import "./Home.css";

export default function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    // to protect the home page
    if (!user) {
      navigate("/login");
    }
  }, [navigate]);
  return <div>
    <h2 className="animate__animated animate__backInLeft">Welcome</h2>
    <h2 className="animate__animated animate__backInRight company">Top Zone</h2>
  </div>;
}
