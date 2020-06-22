import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { createClient } from '../../actions/clientAction';

const backdropVariant = {
    hidden: {opacity: 0},
    visible: {opacity: 1}
}

const modalVariant = {
    hidden: {
        x: '-100vw',
        y: '-50%',
        opacity: 0
    },
    visible: {
        x: '-50%',
        y: '-50%',
        opacity: 1,
        transition: {delay: 0.1},
    }
}

const AddClientModal = ({modal, setModal, checkDoubles}) => {
    const [client, setClient] = useState('');
    const [inputErr, setInputErr] = useState('');

    const dispatch = useDispatch();

    const handleChange = e => {
        const {value} = e.target;
        setInputErr('')
        setClient(value);
    }

    const addClient = e => {
        if (client && !checkDoubles(client)) {
            setInputErr('');
            setClient('');
            setModal(false);
            dispatch(createClient(client));
        } else if (checkDoubles(client)){
            setInputErr('Client already added');
        } else if (!client) {
            setInputErr('Client name is required');
        }
    }

    const onEnter = e => {
        if (e.keyCode === 13) {
            addClient();
        }
    }

    const closeByBackdrop = e => {
        e.stopPropagation();
        if (e.target.id !== '') {
            setModal(false);
            setInputErr('');
        }
    }

    const closeByX = e => {
        e.stopPropagation();
        setModal(false);
        setClient('');
        setInputErr('');
    }

    return (
        <>
        {modal && 
        (<motion.div 
        className="backdrop"
        variant={backdropVariant}
        initial="hidden"
        animate="visible"
        exit="hidden"
        onClick={closeByBackdrop}
        id="backdrop"
        >
            <motion.div 
            className="modal client-tag-modal"
            variants={modalVariant}
            >
                <span className="modal-close" onClick={closeByX}>x</span>
                <p className="modal-add">Add Client</p>
                <input 
                type="text" 
                className="modal__input" 
                autoFocus
                value={client}
                onChange={handleChange} 
                onKeyDown={onEnter}/>
                {inputErr ? <p className="modal__err">{inputErr}</p> : null}
                <button className="modal__btn" onClick={addClient}>Create</button>
            </motion.div>
        </motion.div>)}
        </>
    )
}

AddClientModal.propTypes = {
    modal: PropTypes.bool.isRequired,
    setModal: PropTypes.func.isRequired,
    checkDoubles: PropTypes.func.isRequired
}

export default AddClientModal;
