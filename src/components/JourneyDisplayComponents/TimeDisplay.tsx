import React from 'react';
import { CompactStationInfo } from '../MainPage';

interface TimeDisplayArgs {
    dateTime: Date;
}

const TimeDisplay : React.FC<TimeDisplayArgs> = ({ dateTime }) => {
    return (
        <div className = "time-display">
            {JSON.stringify(dateTime)}
        </div>
    );
}; 

export default TimeDisplay;