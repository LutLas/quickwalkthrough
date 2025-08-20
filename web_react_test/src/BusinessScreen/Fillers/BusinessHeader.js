//Home_Header.js
import React from 'react';
import { NavLink } from 'react-router-dom';


const BusinessHeader = () => {
    return (
        <header className="main-header">
            <a href="/web_react_test/public" className="logo-link">
                <img src="/web_react_test/src/logo.svg" alt="React Logo" />
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

export default BusinessHeader;


const users = [
    { id: 1, name: 'Alice', details: [{depid: 1, status: 'active', department: 'sales' },{depid: 2, status: 'inactive', department: 'IT' }] },
    { id: 2, name: 'Bob', details: { status: 'inactive', department: 'marketing' } },
    { id: 3, name: 'Charlie', details: { status: 'active', department: 'engineering' } },
    { id: 4, name: 'David', details: { status: 'inactive', department: 'sales' } },
];