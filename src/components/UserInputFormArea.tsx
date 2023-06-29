import React, { useEffect, useRef, useState } from 'react';
import { fetchStations } from '../helpers/ApiCallHelper';
import NumberOfPassangersSelect from './NumberOfPassangersSelect';
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
    const [message, setMessage] = useState('Please select both stations');

    const [stationList, setStationList] = useState<StationInfo[]>([]);

    const timeRef = useRef<HTMLInputElement>(null); 
    const firstRender = useRef<boolean>(true);

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
            setMessage('Please select both stations');
        } else {
            if (departureStation.id === destinationStation.id) {
                setMessage('Destination must be diffrent from the departure');
            } else {
                setMessage('');
            }
        }
    }, [departureStation, destinationStation]);

    const stationSort = (stationOne : StationInfo, stationTwo : StationInfo)=>{
        return stationOne.name.toLowerCase() > stationTwo.name.toLowerCase() ? 1 : -1;
    };

    const handleStationResponse = (response : Response) => {
        response.json().then((body) => {
            if(body.stations){
                setStationList(body.stations.sort(stationSort));
            }
        });
    };

    const resetTime = () => {
        if (timeRef.current) {
            const now = new Date();
            const incorrectFormat = now.toLocaleString('en-GB');
            const correctFormat = incorrectFormat.replace(/(\d+)\/(\d+)\/(\d+),\W(\d+:\d+):\d+$/, '$3-$2-$1T$4');
            timeRef.current.value = correctFormat;
        }
    };
    
    useEffect(() => {
        if (firstRender.current){
            firstRender.current = false;
            fetchStations().then(handleStationResponse);
            resetTime();
        }
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

                    <label htmlFor = 'dateSelection'>Departure time:</label>
                    <input 
                        className = 'dateSelection'
                        id = "dateSelection" 
                        ref = { timeRef } 
                        type = 'datetime-local'/>

                    <NumberOfPassangersSelect passangerType = 'adults' />
                    <NumberOfPassangersSelect passangerType = 'children' />
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