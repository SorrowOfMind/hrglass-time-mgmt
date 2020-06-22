import React from 'react';
import { useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { deleteClient } from '../../actions/clientAction';

const ClientCard = ({client}) => {
    const dispatch = useDispatch();
    const removeClient = () => {
        dispatch(deleteClient(client.id));
    }

    return (
        <div className="client-tag-wrapper">
            <div className="client-tag">
                <p className="name">{client.name}</p>
                <div className="fa-wrapper"><FontAwesomeIcon icon={faTrashAlt} className="fa-delete" onClick={removeClient} /></div>
            </div>
        </div>
    )
}

export default ClientCard;
