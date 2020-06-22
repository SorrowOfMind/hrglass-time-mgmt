import React, { useState, useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import {createProject} from '../../actions/projectAction';

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


const styles = {
    control: (styles, {isFocused}) => ({...styles, 
        minWidth: '200px',
        fontSize: '1.6rem', 
        border: isFocused ? '1px solid #323232' : '1px solid #AAAAAA',
        borderRadius: '8px',
        color: 'inherit',
        boxShadow: 'none',
        '&:hover': {
            border: '1px solid #323232',
        }
    }),
    option: (styles, {data, isFocused, isSelected}) => {
        return {
            ...styles,
            color: '#5f6368',
            fontSize: '1.6rem'
        }
    }
  };

const animatedComponents = makeAnimated();

const NewProjectModal = ({modal, hideModal, tags, clients}) => {
    const [projectData, setProjectData] = useState({title: '', dscr: '', deadline: '', client: '', tags: '', totalTime: 0, formattedTotalTime: '00:00:00'});
    const [error, setError] = useState('');

    let clientSelect = clients ? clients.reduce((acc, client) => acc.concat({value: client.name, label: client.name}), []): null;
    let tagSelect = tags ? tags.reduce((acc, tag) => acc.concat({value: tag.name, label: tag.name}), []): null;

    const dispatch = useDispatch();
    const titleInput = useRef(null);

    useEffect(() => {
        if (modal) {
            titleInput.current.focus();
        }
    }, [modal])

    const handleChange = e => {
        const {id, value} = e.target;
        setProjectData(prevProjectData => {
            return {
                ...prevProjectData,
                [id]: value
            }
        })
    }

    const handleClientSelect = (selectedItem) => {
        if (selectedItem) {
            setProjectData(prevProjectData => {
                return {
                    ...prevProjectData,
                    client: selectedItem.value
                }
            })
        }
    }

    const handleTagSelect = (selectedOptions) => {
        if (selectedOptions) {
            let selectedTags = selectedOptions.map(option => option.value);
            setProjectData(prevProjectData => {
                return {
                    ...prevProjectData,
                    tags: selectedTags
                }
            })
        }
    }

    const checkValidity = () => {
        let isValid = true;
        let error = '';
        if (!projectData.title) {
            isValid = false;
            error = 'Choose a title for your project!';
        }
        setError(error);
        return isValid;
    }

    const submitProject = e => {
        e.preventDefault();
        if (checkValidity()) {
            dispatch(createProject(projectData))
                .then(() => setProjectData({title: '', dscr: '', deadline: '', client: '', tags: [], totalTime: 0, formattedTotalTime: '00:00:00'}))
                .then(() => hideModal());
        }
        console.log(projectData);
    }

    const closeByBackdrop = e => {
        e.stopPropagation();
        if (e.target.id === 'backdrop') {
            hideModal();
            setProjectData({title: '', dscr: '', deadline: '', client: '', tags: [], totalTime: 0, formattedTotalTime: '00:00:00'});
        }
    }

    const closeByX = e => {
        e.stopPropagation();
        hideModal();
        setProjectData({title: '', dscr: '', deadline: '', client: '', tags: [], totalTime: 0, formattedTotalTime: '00:00:00'});
    }

    return (
        <>
        {modal &&
        <motion.div 
        className="backdrop"
        variants={backdropVariant}
        initial="hidden"
        animate="visible"
        exit="hidden"
        id="backdrop"
        onClick={closeByBackdrop}
        >
            <motion.form 
            className="newproject__form" 
            onSubmit={submitProject}
            variants={modalVariant}
            >
                <span className="newproject__form_close" onClick={closeByX}>x</span>
                <h1 className="newproject__title">Create new project</h1>
                <div className="inputs-wrapper">

                    <div className="input-wrapper">
                        <label htmlFor="title" className="label">Title:</label>
                        <input
                            type="text"
                            name="title"
                            id="title"
                            ref={titleInput}
                            className="input project__title"
                            value={projectData.title}
                            onChange={handleChange}/>
                    </div>

                    <div className="input-wrapper">
                        <label htmlFor="deadline" className="label">Deadline:</label>
                        <input
                            type="date"
                            className="input project__deadline"
                            id="deadline"
                            name="deadline"
                            value={projectData.deadline}
                            onChange={handleChange}/>
                    </div>

                    <div className="input-wrapper">
                        <label htmlFor="client" className="label">Client:</label>
                        <Select 
                        options={clientSelect} 
                        id="client" 
                        onChange={handleClientSelect} 
                        styles={styles}
                        isClearable={true}
                        isSearchable={true}/>
                    </div>

                    <div className="input-wrapper">
                        <label htmlFor="tag" className="label">Tags:</label>
                        <Select 
                        options={tagSelect} 
                        id="tag" 
                        onChange={handleTagSelect} 
                        styles={styles}
                        isMulti
                        isClearable={true}
                        components={animatedComponents}
                        isSearchable={true}/>
                    </div>

                    <div className="input-wrapper">
                        <label htmlFor="dscr" className="label">Description:</label>
                        <input
                            name="dscr"
                            id="dscr"
                            className="input project__dscr"
                            value={projectData.dscr}
                            onChange={handleChange}/>
                    </div>

                    {error
                        ? <p className="newproject__error">{error}</p>
                        : null}
                    <button type="submit" className="btn__newproject">Create</button>
                </div>
            </motion.form>
        </motion.div>
        }
        </>
    )
}

NewProjectModal.propTypes = {
    modal: PropTypes.bool.isRequired,
    hideModal: PropTypes.func.isRequired,
}

export default withRouter(NewProjectModal);
