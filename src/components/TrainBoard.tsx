import React from 'react';
import { JourneyInfo } from './MainPage';

interface TrainBoardArgs {
    availableJourneys: JourneyInfo[];
}

const TrainBoard : React.FC<TrainBoardArgs> = ({ availableJourneys }) => {
    return (
        <div className = "train-board-container">
            Welcome
            {availableJourneys.map((journey) => {
                return JSON.stringify(journey);
            })}
        </div>
    );
}; 

export default TrainBoard;