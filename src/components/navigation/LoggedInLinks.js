import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { logOut } from '../../actions/authAction';

const LoggedInLinks = ({history, inApp}) => {

    const dispatch = useDispatch();
    
    const handleLogOut = () => {
        dispatch(logOut);
        history.replace('/');
    }

    return (
        <>
            <li className="link"><Link to='/workspace/dashboard' className={inApp ? "link-anchor active" : "link-anchor"}>Workspace</Link></li>
            <li className={inApp ? 'link link-logout link_app' : 'link link-logout'} onClick={handleLogOut}>Log Out</li>
        </>
    )
}

LoggedInLinks.propTypes = {
    inApp: PropTypes.bool.isRequired
}

export default LoggedInLinks;