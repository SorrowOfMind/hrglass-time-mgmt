import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';

const Notification = ({notification}) => {
    return (
        <div className="last-created">
            <h3 className="last-created__title">{notification.content}</h3>
            <div className="last-created__details notification__details">
                <p>{notification.title}</p>
                <p>Created: {moment(notification.time.toDate()).fromNow()}</p>
            </div>
        </div>
    )
}

Notification.propTypes = {
    notification: PropTypes.object.isRequired
}

export default Notification;
