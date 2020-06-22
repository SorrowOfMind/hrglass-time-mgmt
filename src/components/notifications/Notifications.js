import React from 'react';
import PropTypes from 'prop-types';

import Notification from './Notification';

const Notifications = ({notifications}) => {
    return (
        <div className="activity-wrapper">
            {notifications.map((notification,idx) => <Notification key={idx} notification={notification}/>)}
        </div>
    )
}

Notifications.propTypes = {
    notifications: PropTypes.array.isRequired
}

export default Notifications;
