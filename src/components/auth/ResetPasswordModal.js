import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import { resetPassword } from '../../actions/authAction';

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

const ResetPasswordModal = ({modal, setModal}) => {
    const [email, setEmail] = useState('');
    const [inputErr, setInputErr] = useState('');

    const resetErr = useSelector(state => state.auth.resetPasswordError);

    const dispatch = useDispatch();

    const handleChange = e => {
        const {value} = e.target;
        setInputErr('')
        setEmail(value);
    }

    const validate = () => {
        let isValid = true;
        if (!email) {
            isValid = false;
            setInputErr('Email is required');
        }
        if (email) {
            const regex = /^[A-Za-z0-9_.+-]{2,}@[A-Za-z0-9-]+\.[a-z]+$/;
            if (!regex.test(email)) {
                isValid = false;
                setInputErr('Correct e-mail address required');
            }
        }
        return isValid;
    }

    const sendEmail = e => {
        if (validate()) {
            setInputErr('');
            setEmail('');
            setModal(false);
            dispatch(resetPassword(email));
        }
    }

    const onEnter = e => {
        if (e.keyCode === 13) {
            sendEmail();
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
        setEmail('');
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
                <p className="modal-add">Enter e-mail to reset password</p>
                <input 
                type="email"
                name="email"
                className="modal__input" 
                autoFocus
                value={email}
                onChange={handleChange} 
                onKeyDown={onEnter}/>
                {inputErr ? <p className="modal__err">{inputErr}</p> : null}
                {resetErr ? <p className="modal__err">{resetErr}</p> : null}
                <button className="modal__btn" onClick={sendEmail} >Send email</button>
            </motion.div>
        </motion.div>)}
        </>
    )
}

ResetPasswordModal.propTypes = {
    modal: PropTypes.bool.isRequired,
    setModal: PropTypes.func.isRequired
}

export default ResetPasswordModal;
