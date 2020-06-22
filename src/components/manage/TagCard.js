import React from 'react';
import { useDispatch } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { deleteTag } from '../../actions/tagAction';

const TagCard = ({tag}) => {
    const dispatch = useDispatch();
    const removeTag = () => {
        dispatch(deleteTag(tag.id));
    }

    return (
        <div className="client-tag-wrapper">
            <div className="client-tag">
                <p className="name">{tag.name}</p>
                <div className="fa-wrapper"><FontAwesomeIcon icon={faTrashAlt} className="fa-delete" onClick={removeTag} /></div>
            </div>
        </div>
    )
}


export default TagCard;
