import React, { useEffect, useRef, useState } from 'react';
import { fetchStations } from '../helpers/ApiCallHelper';
import NumberOfPassengersSelect from './NumberOfPassangersSelect';
import StationSelectMenu from './StationSelectMenu';

export type StationInfo = {
    name: string;
    latitude: number;
    longitude: number;
    aliases: string[];
    id: number;
    crs: string;
    nlc: string;
    isGrownStation: boolean;
    isSilverSeekStation: boolean;
}

const UserInputFormArea: React.FC = () => {

    const yearFirstFormat = (date: Date) => {
        const incorrectFormat = date.toLocaleString('en-GB');
        const correctFormat = incorrectFormat.replace(/(\d+)\/(\d+)\/(\d+),\W(\d+:\d+):\d+$/, '$3-$2-$1T$4');
        return correctFormat;
    };

    const yearFirstToAPIFormat = (date: Date) => {
        return yearFirstFormat(date) + ':00.000Z';
    };

    const [departureStation, setDepartureStation] = useState<StationInfo>();
    const [destinationStation, setDestinationStation] = useState<StationInfo>();
    const [selectedDate, setSelectedDate] = useState<string>(yearFirstToAPIFormat(new Date()));
    const [numberOfAdults, setNumberOfAdults] = useState<number>(0);
    const [numberOfChildren, setNumberOfChildren] = useState<number>(0);

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

        const selectedTimeAsDate = new Date(selectedDate.slice(0, -3));
        const minimumTime = new Date(new Date().getTime() - 60*60*1000);
        
        if (!departureStation) {
            setMessage('Please select the departure station.');
        } else if(!destinationStation) {
            setMessage('Please select the destination station.');
        } else if  (departureStation.id === destinationStation.id) {
            setMessage('Destination must be diffrent from the departure.');
        } else if (isNaN(selectedTimeAsDate.getTime())) {
            setMessage('Invalid date selected.');
        } else if (selectedTimeAsDate < minimumTime) {
            setMessage('Please select a date in the future.');
        } else if (numberOfAdults + numberOfChildren <= 0) {
            setMessage('Please input at least one passenger.');
        } else {
            setMessage('');
        }
    }, [departureStation, destinationStation, selectedDate, numberOfAdults, numberOfChildren]);

    const stationSort = (stationOne: StationInfo, stationTwo: StationInfo) => {
        return stationOne.name.toLowerCase() > stationTwo.name.toLowerCase() ? 1 : -1;
    };

    const handleStationResponse = (response: Response) => {
        response.json().then((body) => {
            if (body.stations) {
                setStationList(body.stations.sort(stationSort));
            }
        });
    };

    const resetTime = () => {
        if (timeRef.current) {
            timeRef.current.value = yearFirstFormat(new Date());
        }
    };

    useEffect(() => {
        if (firstRender.current) {
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

                    <label htmlFor = 'date-selection'>Departure time:</label>
                    <div>
                        <input
                            className = 'date-selection'
                            id = "date-selection"
                            ref = { timeRef }
                            type = 'datetime-local'
                            onChange = { (event) => {
                                setSelectedDate(yearFirstToAPIFormat(new Date(event.target.value)));
                            } }
                        />
                        <button className = 'reset-date-selection' onClick = { resetTime }>Today</button>
                    </div>

                    <NumberOfPassengersSelect passengerType = 'adults'
                        onChange = { (event) => {
                            setNumberOfAdults(Number(event.target.value));
                        } } />
                    <NumberOfPassengersSelect passengerType = 'children'
                        onChange = { (event) => {
                            setNumberOfChildren(Number(event.target.value));
                        } } />
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