import React from 'react';
import { Link } from "react-router-dom";

import './Navbar.css';

const Navbar = () => {
    return (
        <nav className="nav">
            <Link to="/" className="Home">
                    Home
            </Link>
            <ul>
                <li>
                <Link to="/login" className="Login">
                    Login
                </Link>
                </li>
                <li>
                <Link to="/signup" className="Signup">
                    Signup
                </Link>
                </li>
            </ul>
        </nav>
    )
}

export default Navbar;