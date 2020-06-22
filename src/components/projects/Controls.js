import React from 'react';
import PropTypes from 'prop-types';

import { faPlayCircle } from '@fortawesome/free-regular-svg-icons';
import { faPauseCircle } from '@fortawesome/free-regular-svg-icons';
import { faStopCircle } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Controls = ({startTimer, stopTimer, pauseTimer}) => {
    return (
        <div className="controls">
            <FontAwesomeIcon
                icon={faPlayCircle}
                className="fa fa-play"
                onClick={startTimer}
            />
            <FontAwesomeIcon 
                icon={faPauseCircle} 
                className="fa fa-pause"
                onClick={pauseTimer}
            />
            <FontAwesomeIcon
                icon={faStopCircle}
                className="fa fa-stop"
                onClick={stopTimer}
            />
        </div>
    )
}

Controls.propTypes = {
    startTimer: PropTypes.func.isRequired,
    stopTimer: PropTypes.func.isRequired,
    pauseTimer: PropTypes.func.isRequired
}

export default Controls;
