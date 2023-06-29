import React from 'react';
import { GiSnail } from 'react-icons/gi';
import { HiArrowCircleRight, HiClock } from 'react-icons/hi';
import { SiPuma } from 'react-icons/si';
import StationDisplay from './JourneyDisplayComponents/StationDisplay';
import StatusDisplay from './JourneyDisplayComponents/StatusDisplay';
import TimeDisplay from './JourneyDisplayComponents/TimeDisplay';
import { JourneyInfo } from './MainPage';

interface JourneyDisplayArgs {
    journeyInfo: JourneyInfo;
}

const JourneyDisplay: React.FC<JourneyDisplayArgs> = ({ journeyInfo }) => {

    return (
        <div className = "journey-display" style = { { backgroundColor: journeyInfo.isFastestJourney ? '#bde8ae' : journeyInfo.isOvertaken ? '#e2db6f' : 'white' } }>
            {journeyInfo.isFastestJourney && <div className = 'fastest-train-tag'><SiPuma/>Fastest Train</div>}
            {journeyInfo.isOvertaken && <div className = 'slowest-train-tag'><GiSnail/> Slow Train</div>}
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