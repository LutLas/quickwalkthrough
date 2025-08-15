//Home_Header.js
import React from 'react';
import { NavLink } from 'react-router-dom';


const MainHeader = () => {
    return (
        <header className="main-header">
            <a href="/" className="logo-link">
                <img src="/web_react_test/public/logo512.png" alt="React Logo" />
            </a>
            <nav>
                <ul className="nav-list">
                    <li><NavLink to="/">Home</NavLink></li>
                    <li><NavLink to="/PageBusiness">Businesses</NavLink></li>
                    <li><NavLink to="/PageCategory">Categories</NavLink></li>
                </ul>
            </nav>
        </header>
    );
};

export default MainHeader;