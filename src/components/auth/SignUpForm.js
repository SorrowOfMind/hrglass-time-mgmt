import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signUp } from '../../actions/authAction';
import { Redirect, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faUnlockAlt } from '@fortawesome/free-solid-svg-icons';

const SignUpForm = () => {
    const [newUser, setNewUser] = useState({username: '', email: '', password: ''});
    const [formErrors, setFormErrors] = useState({});
    const [password2, setPassword2] = useState('');

    const nameInput = useRef(null);
    const emailInput = useRef(null);
    const pswdInput = useRef(null);
    const pswd2Input = useRef(null);

    const dispatch = useDispatch();
    const authErr = useSelector(state => state.auth.signupError);
    const authStatus = useSelector(state => state.firebase.auth);

    useEffect(() => {
        nameInput.current.focus();
    }, []);

    const onFirstEnter = e => {
        if (e.key === 'Enter') e.preventDefault();
        if (e.keyCode === 13 && newUser.username !== '') {
            emailInput.current.focus();
        }
    }

    const onSecondEnter = e => {
        if (e.key === 'Enter') e.preventDefault();
        if (e.keyCode === 13 && newUser.username !== '') {
            pswdInput.current.focus();
        }
    }

    const onThirdEnter = e => {
        if (e.key === 'Enter') e.preventDefault();
        if (e.keyCode === 13 && newUser.username !== '') {
            pswd2Input.current.focus();
        }
    }


    const handleChange = e => {
        const {name, value} = e.target;
        setNewUser(prevNewUser => {
            return {
                ...prevNewUser,
                [name]: value
            }
        })
    }

    const checkValidity = () => {
        const errors = {};
        let isValid = true;
        const {username, email, password} = newUser;

        if (!username || !email || !password || !password2) {
            isValid = false;
            errors.empty = 'Fields cannot remain empty';
        }

        if (username) {
            if (username.length < 2) {
                isValid = false;
                errors.username = 'Use at least 2 characters';
            }
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

        if (password2 !== password) {
            isValid = false;
            errors.password2 = 'Passwords do not match.'
        }

        setFormErrors(errors);
        return isValid;
    }

    const handleSubmit = e => {
        e.preventDefault();
        if (checkValidity()) {
            dispatch(signUp(newUser)).then(() => setNewUser({}));
        }
    }

    if (authStatus.uid) return <Redirect to='/'/>

    return (
        <div className="form-wrapper">
            <form className="form" onSubmit={handleSubmit}>
                <h1 className="form__title">SIGN UP</h1>
                
                <div className="input-wrapper">
                    <label className="label" htmlFor="username"><FontAwesomeIcon icon={faUser} className="fa-cred"/></label>
                    <input
                        ref={nameInput}
                        id="username"
                        className="input"
                        name="username"
                        type="text"
                        placeholder="Username"
                        value={newUser.username}
                        onChange={handleChange}
                        onKeyDown={onFirstEnter}
                        />
                    <p className="form__error">{formErrors.username}</p>
                </div>

                
                <div className="input-wrapper">
                    <label className="label" htmlFor="email"><FontAwesomeIcon icon={faEnvelope} className="fa-cred"/></label>
                    <input
                        ref={emailInput}
                        id="email"
                        className="input"
                        name="email"
                        type="email"
                        value={newUser.email}
                        onChange={handleChange}
                        onKeyDown={onSecondEnter}
                        placeholder="E-mail"
                        />
                    <p className="form__error">{formErrors.email}</p>
                </div>

                
                <div className="input-wrapper">
                    <label className="label" htmlFor="password"><FontAwesomeIcon icon={faUnlockAlt} className="fa-cred"/></label>
                    <input
                        ref={pswdInput}
                        id="password"
                        className="input"
                        name="password"
                        type="password"
                        placeholder="Password"
                        value={newUser.password}
                        onChange={handleChange}
                        onKeyDown={onThirdEnter}
                        />
                    <p className="form__error">{formErrors.password}</p>
                </div>

                
                <div className="input-wrapper">
                    <label className="label" htmlFor="password"><FontAwesomeIcon icon={faUnlockAlt} className="fa-cred"/></label>
                    <input
                        ref={pswd2Input}
                        id="password2"
                        className="input"
                        name="password2"
                        type="password"
                        placeholder="Confirm password"
                        value={password2}
                        onChange={e => setPassword2(e.target.value)}
                        />
                    <p className="form__error">{formErrors.password2}</p>
                </div>

                <div className="form__error-empty">{formErrors.empty}</div>

                <button className="btn btn__submit" type="submit">Sign Up!</button>

                {authErr ? <div className="auth-error">{authErr}</div> : null}

                <span className="form__link"><Link to='/login'>Already a member? Log in!</Link></span>
            </form>
        </div>
    )
}

export default SignUpForm;
