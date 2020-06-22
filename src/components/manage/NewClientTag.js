import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

const NewClientTag = ({txt, setModal}) => {
    return (
        <div className="client-tag-wrapper">
            <div className="new-client-tag" onClick={() => setModal(true)}>
                <FontAwesomeIcon icon={faPlus} className="client-tag__icon"/>
                <p className="new-client-tag__txt">{`Add ${txt}`}</p>
            </div>
        </div>
    )
}

NewClientTag.propTypes = {
    txt: PropTypes.string.isRequired,
    setModal: PropTypes.func.isRequired
}

export default NewClientTag;
