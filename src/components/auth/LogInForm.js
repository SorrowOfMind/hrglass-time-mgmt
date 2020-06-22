import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logIn } from '../../actions/authAction';
import { Link, Redirect } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faUnlockAlt } from '@fortawesome/free-solid-svg-icons';

import ResetPasswordModal from './ResetPasswordModal';

const LogInForm = () => {
    const [credentials, setCredentials] = useState({email: '', password: ''});
    const [formErrors, setFormErrors] = useState({});
    const [modal, setModal] = useState(false);

    const emailInput = useRef(null);
    const pswdInput = useRef(null);

    const dispatch = useDispatch();
    const authStatus = useSelector(state => state.firebase.auth);
    const authError = useSelector(state => state.auth.loginError);

    useEffect(() => {
        emailInput.current.focus();
    }, []);

    const handleChange = e => {
        const {name, value} = e.target;
        setCredentials(prevCredentials => {
            return {
                ...prevCredentials,
                [name]: value
            }
        })
    };

    const onFirstEnter = e => {
        if (e.key === 'Enter') e.preventDefault();
        if (e.keyCode === 13 && credentials.email !== '') {
            pswdInput.current.focus();
        }
    }

    const checkValidity = () => {
        const errors = {};
        let isValid = true;
        const {email, password} = credentials;

        if (!email || !password) {
            isValid = false;
            errors.empty = 'Fields cannot remain empty';
        }

        if (email) {
            const regex = /^[A-Za-z0-9_.+-]{2,}@[A-Za-z0-9-]+\.[a-z]+$/;
            if (!regex.test(email)) {
                isValid = false;
                errors.email = 'Correct e-mail address required';
            }
        }

        if (password) {
            const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
            if (!regex.test(password)) {
                isValid = false;
                errors.password = 'Password needs to contain minimum 6 characters - at least one letter and one number.';
            }
        }

        setFormErrors(errors);
        return isValid;
    }

    const handleLogIn = e => {
        e.preventDefault();
        if (checkValidity()) {
            dispatch(logIn(credentials));
        }
    }

    if (authStatus.uid) return <Redirect to='/workspace/dashboard'/>

    return (
        <>
        <ResetPasswordModal modal={modal} setModal={setModal} />
        <div className="form-wrapper">
            <form className="form" onSubmit={handleLogIn}>
                <h1 className="form__title">LOG IN</h1>
                
                <div className="input-wrapper">
                <label className="label" htmlFor="email"><FontAwesomeIcon icon={faEnvelope} className="fa-cred"/></label>
                <input
                    ref={emailInput}
                    className="input"
                    id="email"
                    name="email"
                    type="email"
                    placeholder="E-mail"
                    value={credentials.email}
                    onChange={handleChange}
                    onKeyDown={onFirstEnter}/>
                    {formErrors.email ? <p className="form__error">{formErrors.email}</p> : null}
                </div>

                <div className="input-wrapper">
                <label className="label" htmlFor="password"><FontAwesomeIcon icon={faUnlockAlt} className="fa-cred"/></label>
                <input
                    ref={pswdInput}
                    className="input"
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Password"
                    value={credentials.password}
                    onChange={handleChange}/>
                    {formErrors.password ? <p className="form__error">{formErrors.password}</p> : null}
                </div>
                {authError ? <p className="auth-error">{authError}</p> : null}
                {formErrors.empty ? <p className="form__error-empty">{formErrors.empty}</p> : null}
                <button className="btn btn__submit" type="submit">Log In!</button>
                <div className="form__links">
                    <span className="form__link" onClick={() => setModal(true)}>Forgot password?</span>
                    <span className="form__link"><Link to='/signup'>Not a member? Sign up!</Link></span>
                </div>
            </form>
        </div>
        </>
    )
}

export default LogInForm;
