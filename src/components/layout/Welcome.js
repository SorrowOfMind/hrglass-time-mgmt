import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Welcome = () => {
    const authStatus = useSelector(state => state.firebase.auth);
    return (
        <div className="welcome">
            <h3 className="welcome__title">Time Management</h3>
            <h4 className="welcome__subtitle">Lorem ipsum dolor sit.</h4>
            <p className="welcome__dscr">Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus recusandae officiis repellat quos mollitia, quia voluptatum qui exercitationem animi dicta!</p>
            <Link to={authStatus.uid ? '/workspace/dashboard' : '/signup'} ><button className="btn btn__signup"><span>Start Now</span></button></Link>
        </div>
    )
}

export default Welcome;