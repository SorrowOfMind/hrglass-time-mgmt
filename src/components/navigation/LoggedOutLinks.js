import React from 'react';
import { NavLink } from 'react-router-dom'

const LoggedOutLinks = () => {
    return (
        <>
            <li className="link"><NavLink to='/signup' activeClassName="active" className="link-anchor">Sign Up</NavLink></li>
            <li className="link"><NavLink to='/login' activeClassName="active" className="link-anchor">Log In</NavLink></li>
        </>
    )
}

export default LoggedOutLinks;