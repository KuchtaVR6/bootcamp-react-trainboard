import React, { useState } from 'react';
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

export type CompactStationInfo = {
    displayName: string;
    nlc : string;
    crs : string;
}

export type JourneyInfo = {
    originStation: CompactStationInfo;
    destinationStation: CompactStationInfo;
    departureTime: Date;
    arrivalTime: Date;
    status: string;
    journeyDurationInMinutes: number;
    isFastestJourney: boolean;
    isOvertaken: boolean;
}

const MainPage: React.FC = () => {

    const [departureStation, setDepartureStation] = useState<StationInfo>();
    const [destinationStation, setDestinationStation] = useState<StationInfo>();
    const [availableJourneys, setAvailableJourneys] = useState<JourneyInfo[]>([]);

    const handleBodyFromFareFetch = (body: any) => {
        setAvailableJourneys(
            body.outboundJourneys.map((journey : any) => {return {
                originStation: journey.originStation,
                destinationStation: journey.destinationStation,
                departureTime: new Date(journey.departureTime),
                arrivalTime: new Date(journey.arrivalTime),
                status: journey.status,
                journeyDurationInMinutes: journey.journeyDurationInMinutes,
                isFastestJourney: journey.isFastestJourney,
                isOvertaken: journey.isOvertaken,
            };}),
        );
    };

    const handleSubmitStations = () => {
        fetchFares(getStationId(departureStation), getStationId(destinationStation))
            .then((res) => res.json())
            .then(handleBodyFromFareFetch);
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
        <div className = "main-page">
            <UserInputFormArea 
                departureStation = { departureStation }
                destinationStation = { destinationStation }
                setDepartureStation = { setDepartureStation }
                setDestinationStation = { setDestinationStation }
                handleSubmitStations = { handleSubmitStations }
            />
            <TrainBoard isFetching = { false } isSearching = { false } availableJourneys = { availableJourneys }/>
        </div>
    );
};

export default MainPage;