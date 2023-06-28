import React, { useEffect, useState } from 'react';
import { fetchStations } from '../helpers/ApiCallHelper';
import { StationInfo } from './MainPage';
import StationSelectMenu from './StationSelectMenu';

interface UserInputFormAreaArgs {
    departureStation: StationInfo | undefined;
    destinationStation: StationInfo | undefined;
    setDepartureStation: React.Dispatch<React.SetStateAction<StationInfo | undefined>>;
    setDestinationStation: React.Dispatch<React.SetStateAction<StationInfo | undefined>>;
    handleSubmitStations: () => void;
}

const hardCodedStations: StationInfo[] = [
    {
        codes: {
            id: 3457,
            crs: '1444',
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
            crs: 'HML',
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

const UserInputFormArea: React.FC<UserInputFormAreaArgs> = ({ departureStation, destinationStation, setDepartureStation, setDestinationStation, handleSubmitStations }) => {

    const [message, setMessage] = useState('Please select both stations');

    useEffect(() => {
        if (!departureStation || !destinationStation) {
            setMessage('Please select both stations');
        } else {
            if (departureStation.codes.id === destinationStation.codes.id) {
                setMessage('Destination must be diffrent from the departure');
            } else {
                setMessage('');
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