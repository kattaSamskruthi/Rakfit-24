import React, { useEffect } from "react";
import Logo from './assets/favicon.png';
import { Outlet, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import "./FormLayout.css";
import { clearError } from "../actions/session";

const FooterIcon = ({ icon, href }) => {
  return (
    <div>
      <a href={href} target="_blank" rel="noopener noreferrer">
        {icon}
      </a>
    </div>
  );
};

const FormLayout = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearError());
  }, [location, dispatch]);

  return (
    <div className="form">
      <div className="form__header">
        <div className="form__logo">
          <img className="logo" src={Logo} alt="MyntraLogo" />
        </div>
        <h1>Welcome to Myntra</h1>
        
      </div>
      <div className="form__body">
        <Outlet />
      </div>

    </div>
  );
};

export default FormLayout;
