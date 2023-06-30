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

const UserInputFormArea: React.FC<UserInputFormAreaArgs> = ({ departureStation, destinationStation, setDepartureStation, setDestinationStation, handleSubmitStations }) => {

    const [message, setMessage] = useState('Please select both stations');
    const [stationList, setStationList] = useState<StationInfo[]>([]);

    useEffect(() => {
        if (!departureStation || !destinationStation) {
            setMessage('Please select both stations');
        } else {
            if (departureStation.id === destinationStation.id) {
                setMessage('Destination must be diffrent from the departure');
            } else {
                setMessage('');
            }
        }
    }, [departureStation, destinationStation]);

    const stationSort = (stationOne: StationInfo, stationTwo: StationInfo) => {
        return stationOne.name.toLowerCase() > stationTwo.name.toLowerCase() ? 1 : -1;
    };

    const handleStationResponse = async (response: Response) => {
        const body: {stations: StationInfo[]} = await response.json();
        if (body.stations) {
            setStationList(body.stations.sort(stationSort));
        }
    };

    useEffect(() => {
        const asyncCallsToBeExecuted = async () => {
            const response = await fetchStations();
            handleStationResponse(response);
        };
        asyncCallsToBeExecuted();
    });

    return (
        <div className = "user-area-form-container">
            <div className = "user-area-form">
                <div className = 'station-select-menu'>
                    <StationSelectMenu
                        label = 'Departures:'
                        stationList = { stationList }
                        setSelection = { setDepartureStation }
                        skipTheseStationIDs = { [destinationStation?.id] }
                    />
                    <StationSelectMenu
                        label = 'Destination:'
                        stationList = { stationList }
                        setSelection = { setDestinationStation }
                        skipTheseStationIDs = { [departureStation?.id] }
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