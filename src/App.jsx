import { useState } from "react";
import "./App.css";
import Layout from "./Layout";
import Header from "./components/header/Header";
import { Outlet } from "react-router-dom";
import FooterComponent from "./components/footer/FooterComponent";

const App = () => {
  return (
    <div className="app-container">
      <div className="header-container">
        <Header />
      </div>
      <div className="main-container">
        <div className="sidenav-container"></div>
        <div className="app-content">
          <Outlet />
        </div>
      </div>
      <div className="footer-container">
        <FooterComponent />
      </div>
    </div>
  );
};

export default App;
