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

export type fetchFaresParameters = {
    departureStation : StationInfo | undefined; destinationStation : StationInfo | undefined; selectedDateTimeString: string; selectedNumberOfAdults: number; selectedNumberOfChildren: number;
}

const MainPage: React.FC = () => {

    const [selectedNumberOfAdults, setSelectedNumberOfAdults] = useState<number>(0);
    const [selectedNumberOfChildren, setSelectedNumberOfChildren] = useState<number>(0);
    const [availableJourneys, setAvailableJourneys] = useState<JourneyInfo[]>([]);

    const [isSearching, setIsSearching] = useState<boolean>(true);
    const [isFetching, setIsFetching] = useState<boolean>(false);

    const setAvailableFaresWithFetchResponse = (body: {
        numberOfAdults: number;
        numberOfChildren: number;
        outboundJourneys : JourneyInfo[];
    }) => {
        setAvailableJourneys(body.outboundJourneys);
        setSelectedNumberOfAdults(body.numberOfAdults);
        setSelectedNumberOfChildren(body.numberOfChildren);
    };

    const handleSubmitStations = async (params: fetchFaresParameters) => {
        setAvailableJourneys([]);
        setIsFetching(true);
        setIsSearching(false);        
        const response = await fetchFares(params);
        const body = await response.json();
        setAvailableFaresWithFetchResponse(body);
        setIsFetching(false);
    };

    return (
        <div className = "main-page">
            <UserInputFormArea 
                handleSubmitStations = { handleSubmitStations }
            />
            <TrainBoard 
                isFetching = { isFetching } isSearching = { isSearching } availableJourneys = { availableJourneys }
                selectedNumberOfAdults = { selectedNumberOfAdults } selectedNumberOfChildren = { selectedNumberOfChildren }
            />
        </div>
    );
};

export default MainPage;