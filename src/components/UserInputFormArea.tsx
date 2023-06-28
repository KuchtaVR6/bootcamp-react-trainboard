import React, { useEffect, useState } from 'react';
import { fetchStations } from '../helpers/ApiCallHelper';
import StationSelectMenu from './StationSelectMenu';

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

const UserInputFormArea: React.FC = () => {

    const [departureStation, setDepartureStation] = useState<StationInfo>();
    const [destinationStation, setDestinationStation] = useState<StationInfo>();
    const [message, setErrorMessage] = useState('Please select both stations');

    const [stationList, setStationList] = useState<StationInfo[]>([]);

    const handleSubmitStations = () => {
        window.open(
            'https://www.lner.co.uk/travel-information/travelling-now/live-train-times/depart/' +
            departureStation?.crs + '/' +
            destinationStation?.crs +
            '/',
        );
    };

    useEffect(() => {
        if (!departureStation || !destinationStation) {
            setErrorMessage('Please select both stations');
        } else {
            if (departureStation.id === destinationStation.id) {
                setErrorMessage('Destination must be diffrent from the departure');
            } else {
                setErrorMessage('');
            }
        }
    }, [departureStation, destinationStation]);

    useEffect(() => {
        fetchStations().then((response) => {
            response.json().then((body) => {
                if(body.stations){
                    setStationList(body.stations.sort((stationOne : StationInfo, stationTwo : StationInfo)=>{
                        if(stationOne.name.toLowerCase() > stationTwo.name.toLowerCase()) {
                            return 1;
                        }
                        else {
                            return -1;
                        }
                    }));
                }
            });
        });
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