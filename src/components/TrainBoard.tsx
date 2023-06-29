import React from 'react';
import JourneyDisplay from './JourneyDisplay';
import { JourneyInfo } from './MainPage';

interface TrainBoardArgs {
    awaitSearch: boolean;
    awaitFetch: boolean;
    availableJourneys: JourneyInfo[];
}

const TrainBoard: React.FC<TrainBoardArgs> = ({ awaitSearch, awaitFetch, availableJourneys }) => {
    if (availableJourneys.length > 0) {
        return (
            <div className = "train-board-container">
                Your Journey from
                <b> {availableJourneys[0].originStation.displayName} </b>
                to
                <b> {availableJourneys[0].destinationStation.displayName}</b>.
                <hr />
                {availableJourneys.map((journey, index) => {
                    return <JourneyDisplay journeyInfo = { journey } key = { index } />;
                })}
            </div>
        );
    }
    else if (awaitSearch) {
        return (
            <div className = "train-board-container">
                <h3>Please search and press Submit</h3>
            
            </div>
        );
    }
    else if (awaitFetch) {
        return (
            <div className = "train-board-container">
                <h3>Loading...</h3>

            </div>
        );
    }
    else {
        return (
            <div className = "train-board-container">
                <h3>There are no connections between these stations :/</h3>
            </div>
        );
    }

};

export default TrainBoard;