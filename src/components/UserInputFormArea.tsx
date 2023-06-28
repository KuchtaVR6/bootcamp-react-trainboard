import React, { useEffect, useState } from 'react';
import { fetchStations } from '../helpers/ApiCallHelper';
import StationSelectMenu from './StationSelectMenu';

export type StationInfo = {
    name: string;
    latitude: number;
    longitude: number;
    aliases: string[];
    codes: {
        id: number;
        crs: string;
        nlc: string;
    };
}

const hardCodedStations: StationInfo[] = [
    {
        codes: {
            id: 3457,
            crs: 'KGX',
            nlc: '6121',
        },
        name: 'London Kings Cross',
        aliases: [
            'Queens Cross',
        ],
        latitude: 51.53088842,
        longitude: -0.122921342,
    },
    {
        codes: {
            id: 3458,
            crs: 'EDB',
            nlc: '6121',
        },
        name: 'Edinburgh',
        aliases: [
            'Queens Cross',
        ],
        latitude: 51.53088842,
        longitude: -0.122921342,
    },
    {
        codes: {
            id: 3459,
            crs: 'DUR',
            nlc: '6121',
        },
        name: 'Durham',
        aliases: [
            'Queens Cross',
        ],
        latitude: 51.53088842,
        longitude: -0.122921342,
    },
];

const UserInputFormArea: React.FC = () => {

    const [departureStation, setDepartureStation] = useState<StationInfo>();
    const [destinationStation, setDestinationStation] = useState<StationInfo>();
    const [message, setErrorMessage] = useState('Please select both stations');

    const handleSubmitStations = () => {
        window.open(
            'https://www.lner.co.uk/travel-information/travelling-now/live-train-times/depart/' +
            departureStation?.codes.crs + '/' +
            destinationStation?.codes.crs +
            '/',
        );
    };

    useEffect(() => {
        if (!departureStation || !destinationStation) {
            setErrorMessage('Please select both stations');
        } else {
            if (departureStation.codes.id === destinationStation.codes.id) {
                setErrorMessage('Destination must be diffrent from the departure');
            } else {
                setErrorMessage('');
            }
        }
        
    },[departureStation,destinationStation]);

    return (
        <div className = "user-area-form-container">
            <div className = "user-area-form">
                <div className = 'station-select-menu'>
                    <StationSelectMenu
                        label = 'Departures:'
                        stationList = { hardCodedStations }
                        setSelection = { setDepartureStation }
                        skipTheseStationIDs = { [destinationStation?.codes.id] }
                    />
                    <StationSelectMenu
                        label = 'Destination:'
                        stationList = { hardCodedStations }
                        setSelection = { setDestinationStation }
                        skipTheseStationIDs = { [departureStation?.codes.id] }
                    />
                </div>

                <div className = 'station-submit-area'>
                    <div className = 'message'>{message}</div>
                    <button className = 'station-select-submit' onClick = { handleSubmitStations } disabled = { message.length > 0 }>Submit</button>
                </div>

            </div>
        </div>
    );
};

export default UserInputFormArea;