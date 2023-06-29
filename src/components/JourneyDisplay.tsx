import React from 'react';
import { HiArrowCircleRight, HiClock } from 'react-icons/hi';
import StationDisplay from './JourneyDisplayComponents/StationDisplay';
import StatusDisplay from './JourneyDisplayComponents/StatusDisplay';
import TimeDisplay from './JourneyDisplayComponents/TimeDisplay';
import { JourneyInfo } from './MainPage';

interface JourneyDisplayArgs {
    journeyInfo: JourneyInfo;
}

const JourneyDisplay: React.FC<JourneyDisplayArgs> = ({ journeyInfo }) => {

    return (
        <div className = "journey-display" style = { { backgroundColor: journeyInfo.isFastestJourney ? '#bde8ae' : 'white' } }>
            {journeyInfo.isFastestJourney && <div className = 'fastest-train-tag'>Fastest Train</div>}
            <div className = 'first-row'>
                <StatusDisplay status = { journeyInfo.status }/>
                <div className = "route-display">
                    <StationDisplay stationInfo = { journeyInfo.originStation } />
                    <HiArrowCircleRight />
                    <StationDisplay stationInfo = { journeyInfo.destinationStation } />
                </div>
            </div>
            <div className = 'duration-display'>
                <HiClock />
                <TimeDisplay dateTime = { journeyInfo.departureTime } />
                <span className = 'area-between'>
                    {journeyInfo.journeyDurationInMinutes} mins
                    <hr />
                </span>
                <TimeDisplay dateTime = { journeyInfo.arrivalTime } />
            </div>
            <hr />
        </div>
    );
};

export default JourneyDisplay;