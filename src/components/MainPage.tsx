import React, { useEffect, useState } from 'react';
import { fetchFares } from '../helpers/ApiCallHelper';
import TrainBoard from './TrainBoard';
import UserInputFormArea from './UserInputFormArea';

export type StationInfo = {
    name: string;
    latitude: number;
    longitude: number;
    aliases: string[];
    id: number;
    crs: string;
    nlc: string;
    isGrownStation : boolean; 
    isSilverSeekStation : boolean;
}

const MainPage: React.FC = () => {

    const [departureStation, setDepartureStation] = useState<StationInfo>();
    const [destinationStation, setDestinationStation] = useState<StationInfo>();

    const handleSubmitStations = () => {

        fetchFares(getStationId(departureStation), getStationId(destinationStation))
            .then((res) => res.json())
            .then((json) => {
                console.log(json);
            });
    };

    const getStationId = (station: StationInfo | undefined): string => {
        if (!station) {
            throw new Error('Abort: Station not selected.');
        }
        if (station.crs.length > 0) {
            return station.crs;
        } else if (station.nlc.length > 0) {
            return station.nlc;
        } else {
            throw new Error('Abort: Station invalid.');
        }
    };

    return (
        <>
            <UserInputFormArea 
                departureStation = { departureStation }
                destinationStation = { destinationStation }
                setDepartureStation = { setDepartureStation }
                setDestinationStation = { setDestinationStation }
                handleSubmitStations = { handleSubmitStations }
            />
            <TrainBoard />
        </>
    );
};

export default MainPage;