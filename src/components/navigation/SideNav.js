import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import ReactTooltip from "react-tooltip";
import { useMediaQuery } from 'react-responsive';

const SideNav = ({match, urls}) => {
    const isMobile = useMediaQuery({query: '(max-width: 700px)'});
    return (
        <div className="sidenav-wrapper">
            <ul className="sidenav">
                {urls.map(({name,id, fa, dataTip}) => {
                    if (id !== 'newproject' && id !== 'projects/:projectId') {
                    return <li key={id} className="sidenav__link" data-tip={dataTip}>
                        <NavLink to={`${match.url}/${id}`} activeClassName="sidenav_active" className="link">{fa()} {name}</NavLink>
                        {isMobile && <ReactTooltip place="top" type="dark" effect="solid"  event={'mouseenter' || 'focus'} eventOff={"mouseleave" || "click" || 'focusout'}/>}
                        </li>}
                    }
                )}
            </ul>
        </div>
    )
}

SideNav.propTypes = {
    urls: PropTypes.array.isRequired
}

export default SideNav;
