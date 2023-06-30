import React from 'react';
import JourneyDisplay from './JourneyDisplay';
import Loader from './Loader';
import { JourneyInfo } from './MainPage';

interface TrainBoardArgs {
    isSearching: boolean;
    isFetching: boolean;
    availableJourneys: JourneyInfo[];
}

const TrainBoard: React.FC<TrainBoardArgs> = ({ isSearching, isFetching, availableJourneys }) => {
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
    else if (isSearching) {
        return (
            <div className = "train-board-container">
                <h3>Please search and press Submit</h3>
            </div>
        );
    }
    else if (isFetching) {
        return (
            <Loader size = { '5em' } background = { true }/>
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