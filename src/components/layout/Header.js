import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const Header = ({title, query, handleChange, placeholder}) => {
    return (
        <header className="header" >
            <h1 className="section__title">{title}</h1>
            <div className="searchbar-wrapper">
                <input
                    type="text"
                    id="searchbar"
                    placeholder={placeholder}
                    className="searchbar"
                    value={query}
                    onChange={handleChange}/>
                <label htmlFor="searchbar" className="searchbar__label"><FontAwesomeIcon icon={faSearch} className="fa-search"/></label>
            </div>
        </header>
    )
}

Header.propTypes = {
    title: PropTypes.string.isRequired,
    query: PropTypes.string.isRequired,
    handleChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string.isRequired
}

export default Header;
