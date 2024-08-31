import React from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import Logo from './assets/favicon.png';
import SearchIcon from "@mui/icons-material/Search";
import { useDispatch } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import "./NavBar.css";
import { logout } from "../actions/session";
import Tooltip from '@mui/material/Tooltip';

const NavBar = ({ query }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSearch = (event) => {
    event.preventDefault();
    const searchQuery = event.target.query.value.trim(); 
    if (searchQuery) {
      navigate(`/search/${encodeURIComponent(searchQuery)}`); 
    }
  };

  const handleLogout = () => dispatch(logout());

  return (
    <div className="nav-bar">
      <div className="nav-bar__icon nav-bar__icon--red">
        <Link to="/">
          <img className="logo" src={Logo} alt="MyntraLogo" />
        </Link>
      </div>
      <div className="nav-bar__link">
        <Tooltip title="Home" arrow>
          <NavLink to="/" className="nav-bar__link_to_home">
            <div className="home">Home</div>
          </NavLink>
        </Tooltip>
      </div>
      <div className="nav-bar__link">
        <Tooltip title="Add a Look" arrow>
          <NavLink to="/addlook" className="nav-bar__link">
            <div className="home">Add Look</div>
          </NavLink>
        </Tooltip>
      </div>
      <div className="nav-bar__link">
        <Tooltip title="Add a Product" arrow>
          <NavLink to="/addproduct" className="nav-bar__link">
            <div className="home">Add Product</div>
          </NavLink>
        </Tooltip>
      </div>
      <div className="nav-bar__link">
        <Tooltip title="Ask" arrow>
          <a href="https://rag-model-bg7xdf3pehdhxyqokfrufn.streamlit.app/" target="_blank" rel="noopener noreferrer" className="nav-bar__link">
            <div className="home">AskFit</div>
          </a>
        </Tooltip>
      </div>
      <div className="nav-bar__link">
        <Tooltip title="Shop" arrow>
          <NavLink to="/shop" className="nav-bar__link">
            <div className="home">Shop</div>
          </NavLink>
        </Tooltip>
      </div>
      <div className="nav-bar__search-box">
        <SearchIcon />
        <form onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search"
            name="query"
            defaultValue={query || ""}
          />
          <button type="submit">Search</button>
        </form>
      </div>
      <div className="nav-bar__icon-group">
        <Tooltip title="CollabCart" arrow>
          <div className="nav-bar__icon nav-bar__icon--gray">
            <Link to="/CollabCart">
              <ShoppingBagIcon />
            </Link>
          </div>
        </Tooltip>
        <Tooltip title="Profile" arrow>
          <div className="nav-bar__icon nav-bar__icon--gray">
            <Link to="/profile">
              <AccountCircleIcon />
            </Link>
          </div>
        </Tooltip>
        <Tooltip title="Logout" arrow>
          <div className="nav-bar__icon nav-bar__icon--gray" onClick={handleLogout}>
            <LogoutIcon />
          </div>
        </Tooltip>
      </div>
    </div>
  );
};

export default NavBar;
