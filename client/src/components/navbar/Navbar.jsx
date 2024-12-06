import React from 'react';
import { Link } from 'react-router-dom'; // Import from react-router-dom
import logo from './../../assets/logofont.svg';
import './navbar.css';

const NavLinks = () => (
  <React.Fragment>
    <p>
      <Link to="/blog">Blog</Link>
    </p>
    <p>
      <Link to="/product">Product</Link>
    </p>
    <p>
      <Link to="/community">Community</Link>
    </p>
    <p>
      <Link to="/pricing">Pricing</Link>
    </p>
    <p>
      <Link to="/contact">Contact Us</Link>
    </p>
    <p>
      <Link to="/login">Login</Link>
    </p>
  </React.Fragment>
);

const Navbar = () => {
  return (
    <div className="landing-navbar">
      <div className="landing-navbar-logo">
        <img src={logo} alt="aankh-logo" />
      </div>
      <div className="landing-navbar-links">
        <NavLinks />
      </div>
    </div>
  );
};

export default Navbar;
