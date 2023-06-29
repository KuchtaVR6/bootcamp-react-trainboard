import React from 'react';

interface TimeDisplayArgs {
    dateTime: Date;
}

const TimeDisplay: React.FC<TimeDisplayArgs> = ({ dateTime }) => {
    return (
        <span className = "time-display">
            <span className = 'date'>{dateTime.toLocaleDateString('en-GB', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
            {dateTime.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}
        </span>
    );
};

export default TimeDisplay;