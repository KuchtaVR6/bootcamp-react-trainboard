import React, { useEffect, useRef, useState } from 'react';
import { fetchStations } from '../helpers/ApiCallHelper';
import { StationInfo } from './MainPage';
import NumberOfPassengersSelect from './NumberOfPassangersSelect';
import StationSelectMenu from './StationSelectMenu';

interface UserInputFormAreaArgs {
    departureStation: StationInfo | undefined;
    destinationStation: StationInfo | undefined;
    setDepartureStation: React.Dispatch<React.SetStateAction<StationInfo | undefined>>;
    setDestinationStation: React.Dispatch<React.SetStateAction<StationInfo | undefined>>;
    handleSubmitStations: () => void;
}

const UserInputFormArea: React.FC<UserInputFormAreaArgs> = ({ departureStation, destinationStation, setDepartureStation, setDestinationStation, handleSubmitStations }) => {
  
    // converts to YYYY-MM-DDTHH:MM
    const convertToHTMLDateInputFormat = (date: Date) => {
        return date.toLocaleString('en-GB').replace(/(\d+)\/(\d+)\/(\d+),\W(\d+:\d+):\d+$/, '$3-$2-$1T$4');
    };

    // converts to YYYY-MM-DDTHH:MM:00.000Z as the exact second and milisecond is redundant
    const convertsToLNERAPIDateFormat = (date: Date) => {
        return convertToHTMLDateInputFormat(date) + ':00.000Z';
    };

    const [selectedDate, setSelectedDate] = useState<string>(convertsToLNERAPIDateFormat(new Date()));
    const [numberOfAdults, setNumberOfAdults] = useState<number>(0);
    const [numberOfChildren, setNumberOfChildren] = useState<number>(0);

    const [message, setMessage] = useState('Please select both stations');
    const [stationList, setStationList] = useState<StationInfo[]>([]);

    const dateTimeInputElement = useRef<HTMLInputElement>(null);
    const firstRender = useRef<boolean>(true);

    const getAdjustedTimeByDeltaMinutes = (date: Date, deltaInMinutes: number): Date => {
        return new Date(date.getTime() + deltaInMinutes * 60 * 1000);
    };

    const validateFormChecks : Map<() => boolean, string> = new Map([
        [() => {return !departureStation;}, 'Please select the departure station.'],
        [() => {return !destinationStation;}, 'Please select the destination station.'],
        [() => {return departureStation?.id === destinationStation?.id;}, 'Destination must be diffrent from the departure.'],
        [() => {
            const selectedTimeAsDate = new Date(selectedDate.slice(0, -3));
            return isNaN(selectedTimeAsDate.getTime());
        }, 'Invalid date selected.'],
        [() => {
            const selectedTimeAsDate = new Date(selectedDate.slice(0, -3));
            const earliestSearchableTime = getAdjustedTimeByDeltaMinutes(new Date(), -60);
            return selectedTimeAsDate < earliestSearchableTime;
        }, 'Please select a date in the future.'],
        [() => {return numberOfAdults + numberOfChildren <= 0;}, 'Please input at least one passenger.'],
    ]);

    const verifyFormInputsAndSetMessage = () => {
        setMessage('');
        for (const [check, error] of Array.from(validateFormChecks)) {
            if (check()) {
                setMessage(error); 
                break;
            }
        }
    };

    useEffect(() => {
        verifyFormInputsAndSetMessage();
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

    const resetTimeToNow = () => {
        if (dateTimeInputElement.current) {
            dateTimeInputElement.current.value = convertToHTMLDateInputFormat(new Date());
            setSelectedDate(convertsToLNERAPIDateFormat(new Date()));
        }
    };

    useEffect(() => {
        if (firstRender.current) {
            firstRender.current = false;
            fetchStations().then(handleStationResponse);
            resetTimeToNow();
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
                            ref = { dateTimeInputElement }
                            type = 'datetime-local'
                            onChange = { (event) => {setSelectedDate(convertsToLNERAPIDateFormat(new Date(event.target.value)));} }
                        />
                        <button className = 'reset-date-selection' onClick = { resetTimeToNow }>Today</button>
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