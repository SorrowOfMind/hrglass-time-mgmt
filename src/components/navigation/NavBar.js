import React, { useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { useSelector } from 'react-redux';

import LoggedInLinks from './LoggedInLinks';
import LoggedOutLinks from './LoggedOutLinks';

const NavBar = ({history}) => {
    const [inApp, setInApp] = useState(false);
    const auth = useSelector(state => state.firebase.auth);
    const profile = useSelector(state => state.firebase.profile)
    const links = auth.uid ? <LoggedInLinks history={history} inApp={inApp} /> : <LoggedOutLinks />;
    const initials = auth.uid ? profile.initials : '??';
    const url = history.location.pathname;
    
    useEffect(() => {
        if (url.indexOf('workspace') !== -1) {
            setInApp(true);
        }
        return () => setInApp(false);
    }, [url]);

    return (
        <nav className={inApp ? 'navbar navbar_app' : 'navbar'}>
            <h1 className={inApp ? 'logo logo_app' : 'logo'}><Link to='/'>hrGlass</Link></h1>
            <div className="nav__links">
                <ul className="links">
                    {auth.isLoaded && links}
                </ul>
                <div className="initialsBox">
                    <Link to='/'>{auth.isLoaded && initials}</Link>
                </div>
            </div>
        </nav>
    )
}

export default withRouter(NavBar);
