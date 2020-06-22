import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { createTag } from '../../actions/tagAction';

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

const AddTagModal = ({modal, setModal, checkDoubles}) => {
    const [tag, setTag] = useState('');
    const [inputErr, setInputErr] = useState('');

    const dispatch = useDispatch();

    const handleChange = e => {
        const {value} = e.target;
        setInputErr('')
        setTag(value);
    }
 
    const addTag = () => {
        if (tag && !checkDoubles(tag)) {
            setInputErr('')
            setModal(false);
            setTag('');
            dispatch(createTag(tag));
        } else if (checkDoubles(tag)) {
            setInputErr('Tag already added');
        } else if (!tag) {
            setInputErr('Tag name is required');
        }
    }

    const onEnter = e => {
        if (e.keyCode === 13) {
            addTag();
        }
    }

    const closeByBackdrop = e => {
        e.stopPropagation();
        if (e.target.id === 'backdrop') {
            setModal(false);
            setTag('');
            setInputErr('');
        }
    }

    const closeByX = e => {
        e.stopPropagation();
        setModal(false);
        setTag('');
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
                <p className="modal-add">Add Tag</p>
                <input 
                type="text" 
                className="modal__input" 
                autoFocus
                value={tag}
                onChange={handleChange}
                onKeyDown={onEnter}
                />
                {inputErr ? <p className="modal__err">{inputErr}</p> : null}
                <button className="modal__btn" onClick={addTag}>Create</button>
            </motion.div>
        </motion.div>)}
        </>
    )
}

AddTagModal.propTypes = {
    modal: PropTypes.bool.isRequired,
    setModal: PropTypes.func.isRequired,
    checkDoubles: PropTypes.func.isRequired
}

export default AddTagModal;
