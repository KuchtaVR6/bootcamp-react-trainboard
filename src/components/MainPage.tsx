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
}

export type CompactStationInfo = {
    displayName: string;
    nlc : string;
    crs : string;
}

export type JourneyInfo = {
    originStation: CompactStationInfo;
    destinationStation: CompactStationInfo;
    departureTime: string;
    arrivalTime: string;
    status: string;
    journeyDurationInMinutes: number;
    isFastestJourney: boolean;
    isOvertaken: boolean;
}

const MainPage: React.FC = () => {

    const [departureStation, setDepartureStation] = useState<StationInfo>();
    const [destinationStation, setDestinationStation] = useState<StationInfo>();
    const [availableJourneys, setAvailableJourneys] = useState<JourneyInfo[]>([]);

    const [isSearching, setIsSearching] = useState<boolean>(true);
    const [isFetching, setIsFetching] = useState<boolean>(false);

    const setAvailableFaresWithFetchResponse = (body: {outboundJourneys : JourneyInfo[]}) => {
        setAvailableJourneys(body.outboundJourneys);
    };

    const handleSubmitStations = async () => {
        setAvailableJourneys([]);
        setIsFetching(true);
        setIsSearching(false);        
        const response = await fetchFares(getStationId(departureStation), getStationId(destinationStation));
        const body = await response.json();
        setAvailableFaresWithFetchResponse(body);
        setIsFetching(false);
    };

    const getStationId = (station: StationInfo | undefined): string => {
        if (!station) {
            throw new Error('Abort: Station not selected.');
        }
        if (station.crs && station.crs.length > 0) {
            return station.crs;
        } else if (station.nlc && station.nlc.length > 0) {
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
            <TrainBoard isFetching = { isFetching } isSearching = { isSearching } availableJourneys = { availableJourneys }/>
        </div>
    );
};

export default MainPage;