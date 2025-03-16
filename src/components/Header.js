import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="logo">DonorTide</div>
      <nav className="nav">
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/urgent-requests">Urgent Requests</Link></li>
          <li><Link to="/most-donated">Most Donated</Link></li>
          <li><Link to="/nearby-volunteers">Nearby Volunteers</Link></li>
          <li><Link to="/top-consultants">Top Consultants</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/donate">Donate</Link></li>
          <li><Link to="/contact">Contact</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
