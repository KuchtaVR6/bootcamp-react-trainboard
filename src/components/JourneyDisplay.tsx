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

    const minutesToHoursAndMinutes = (minutes : number): string => {
        if (minutes < 60) {
            return minutes + ' min';
        } else {
            const hours  = Math.floor(minutes / 60);
            const remainingMinutes = minutes % 60;
            return hours + 'h ' + remainingMinutes + 'min';
        }
    };

    return (
        <div 
            className = { 'journey-display ' + (journeyInfo.isFastestJourney ? 'fast-train' : journeyInfo.isOvertaken ? 'slow-train' : '' ) }>

            {journeyInfo.isFastestJourney && <div className = 'fastest-train-tag'><SiPuma/>Fastest Train</div>}
            {journeyInfo.isOvertaken && <div className = 'slowest-train-tag'><GiSnail/> Slow Train</div>}

            <div className = 'status-and-route'>
                <StatusDisplay status = { journeyInfo.status }/>
                <div className = "route-display">
                    <StationDisplay stationInfo = { journeyInfo.originStation } />
                    <HiArrowCircleRight />
                    <StationDisplay stationInfo = { journeyInfo.destinationStation } />
                </div>
            </div>

            <div className = 'duration-display'>
                <HiClock />
                <TimeDisplay dateTime = { new Date(journeyInfo.departureTime) } />
                <span className = 'area-between'>
                    {minutesToHoursAndMinutes(journeyInfo.journeyDurationInMinutes)}
                    <hr />
                </span>
                <TimeDisplay dateTime = { new Date(journeyInfo.arrivalTime) } />
            </div>
            <hr />
        </div>
    );
};

export default JourneyDisplay;