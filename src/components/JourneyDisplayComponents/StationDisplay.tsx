import React from 'react';
import { CompactStationInfo } from '../MainPage';

interface StationDisplayArgs {
    stationInfo: CompactStationInfo;
}

const StationDisplay : React.FC<StationDisplayArgs> = ({ stationInfo }) => {
    return (
        <span className = "station-display">
            <span className = 'station-name'>{stationInfo.displayName} </span>
            {stationInfo.crs}
        </span>
    );
}; 

export default StationDisplay;