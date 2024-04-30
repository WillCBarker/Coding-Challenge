import React, { useContext } from 'react';
import { Link } from "react-router-dom";
import { AuthContext } from '../../context/auth-context';
import './Navbar.css';

const Navbar = () => {
    const auth = useContext(AuthContext);

    return (
        <nav className="nav">
            <Link to="/" className="Home">
                    Home
            </Link>
            <ul>
                { auth.isLoggedIn && 
                    <li>
                    <Link to="/user" className="User">
                        User
                    </Link>
                    </li>
                }
                { !auth.isLoggedIn &&
                    <li>
                    <Link to="/login" className="Login">
                        Login
                    </Link>
                    </li>
                }
                { !auth.isLoggedIn &&       
                    <li>
                    <Link to="/signup" className="Signup">
                        Sign Up
                    </Link>
                    </li>
                }   
                { auth.isLoggedIn &&       
                    <li>
                    <Link to="/login" onClick={auth.logout} className="Signup">
                        Logout
                    </Link>
                    </li>
                }         
            </ul>
        </nav>
    )
}

export default Navbar;