import { useState } from "react";
import "./App.scss";
import Layout from "./Layout";
import Header from "./components/header/Header";
import { Outlet } from "react-router-dom";
import FooterComponent from "./components/footer/FooterComponent";
import PerfectScrollbar from "react-perfect-scrollbar";

const App = () => {
  return (
    <div className="app-container">
      <div className="header-container">
        <Header />
      </div>
      <div className="main-container">
        <PerfectScrollbar>
          <Outlet />
        </PerfectScrollbar>
      </div>
      {/* <div className="footer-container">
        <FooterComponent />
      </div> */}
    </div>
  );
};

export default App;
