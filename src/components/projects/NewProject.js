import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { createProject } from '../../actions/projectAction';

const NewProject = (props) => {
    const [projectData, setProjectData] = useState({title: '', dscr: '', deadline: '', totalTime: 0, formattedTotalTime: '00:00:00'});
    const [error,setError] = useState('');

    const dispatch = useDispatch();

    const handleChange = e => {
        const {id, value} = e.target;
        setProjectData(prevProjectData => {
            return {
                ...prevProjectData,
                [id]: value
            }
        })
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
                .then(() => setProjectData({title: '', dscr: '', deadline: '',totalTime: 0, formattedTotalTime: '00:00:00'}))
                .then(() => props.history.push('/workspace/projects'));
        }
    }

    return (
        <div className="newproject">
            <form className="newproject__form" onSubmit={submitProject}>
                <h1 className="newproject__title">Create new project</h1>
                <div className="inputs-wrapper">

                    <div className="input-wrapper">
                    <label htmlFor="title" className="label">Title:</label>
                    <input type="text" name="title" id="title" className="input project__title" value={projectData.title} onChange={handleChange} />
                    </div>

                    <div className="input-wrapper">
                    <label htmlFor="deadline" className="label">Deadline:</label>
                    <input type="date" className="input project__deadline" id="deadline" name="deadline" value={projectData.deadline} onChange={handleChange}/>
                    </div>

                    <div className="input-wrapper">
                    <label htmlFor="dscr" className="label">Description:</label>
                    <textarea name="dscr" id="dscr" className="input project__dscr" value={projectData.dscr} onChange={handleChange}/>
                    </div>

                    {error ? <p className="newproject__error">{error}</p> : null}
                    <button type="submit" className="btn__newproject">Create</button>
                </div>
            </form>
        </div>
    )
}

export default withRouter(NewProject);
