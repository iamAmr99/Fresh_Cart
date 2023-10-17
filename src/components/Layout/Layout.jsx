import React, { useContext, useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { Outlet } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";
import { Offline } from "react-detect-offline";

export default function Layout() {
  let { setUserToken } = useContext(UserContext);
  useEffect(() => {
    if (localStorage.getItem("userToken") !== null) {
      setUserToken(localStorage.getItem("userToken"));
    }
  });
  return (
    <>
      <Navbar />
<div className="container">
      <Outlet></Outlet>
</div>

      <Offline>
        <div className="offline-toast">
          <i className="fas fa-ban "></i> You are Offline
        </div>
      </Offline>
      <Footer />
    </>
  );
}
