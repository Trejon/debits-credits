import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">Debits Credits</div>
      <div className="navbar-links">
        <Link to="/">Home</Link>
        <Link to="/accounts">Accounts</Link>
        <Link to="/transactions">Transactions</Link>
        <Link to="/budgets">Budgets</Link>
        <Link to="/profile">Profile</Link>
      </div>
    </nav>
  );
};

export default Navbar;
