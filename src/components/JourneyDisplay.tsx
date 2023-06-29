import React from 'react';
import { HiArrowCircleRight } from 'react-icons/hi';
import StationDisplay from './JourneyDisplayComponents/StationDisplay';
import TimeDisplay from './JourneyDisplayComponents/TimeDisplay';
import { JourneyInfo } from './MainPage';

interface JourneyDisplayArgs {
    journeyInfo: JourneyInfo;
}

const JourneyDisplay: React.FC<JourneyDisplayArgs> = ({ journeyInfo }) => {
    return (
        <div className = "journey-display">
            <div className = "route-display">
                <StationDisplay stationInfo = { journeyInfo.originStation } />
                <HiArrowCircleRight />
                <StationDisplay stationInfo = { journeyInfo.destinationStation } />
            </div>
            <TimeDisplay dateTime = { journeyInfo.departureTime } />
            <TimeDisplay dateTime = { journeyInfo.arrivalTime } />
            {JSON.stringify(journeyInfo)}
            <hr />
        </div>
    );
};

export default JourneyDisplay;