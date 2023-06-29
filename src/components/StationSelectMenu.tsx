import React from 'react';
import { StationInfo } from './MainPage';

interface StationSelectMenuArgs {
    label: string;
    stationList: StationInfo[];
    setSelection: React.Dispatch<React.SetStateAction<StationInfo | undefined>>;
    skipTheseStationIDs: (number | undefined)[];
}

const StationSelectMenu: React.FC<StationSelectMenuArgs> = ({ label, stationList, setSelection, skipTheseStationIDs }) => {
    return (
        <>
            <label htmlFor = { 'station-selector-' + label } >
                <span>{label}</span>
            </label>
            <select 
                id = { 'station-selector-' + label }
                defaultValue = { 'notselected' }
                onChange = { (event) => {
                    setSelection(stationList.find((station) => {
                        return station.id === Number(event.target.value);
                    }));
                } }
            >
                
                <option label = " " style = { { display: 'none' } } value = "notselected"></option>

                {stationList.map((stationEntry) => {
                    if (!skipTheseStationIDs.includes(stationEntry.id)) {
                        return (
                            <option 
                                value = { stationEntry.id } 
                                key = { stationEntry.id }>
                                {stationEntry.name}
                            </option>
                        );
                    }
                })}
            </select>
        </>
    );
};

export default StationSelectMenu;