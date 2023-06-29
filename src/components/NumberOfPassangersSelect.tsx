import React from 'react';

interface NumberOfPassangersSelectArgs {
    passengerType : string;
    onChange : (event : React.ChangeEvent<HTMLInputElement>) => void;
}

const NumberOfPassengersSelect: React.FC<NumberOfPassangersSelectArgs> = ({ passengerType, onChange }) => {
    return (
        <div>
            <label htmlFor = { passengerType }>Select the number of {passengerType}: </label>
            <input id = { passengerType } 
                className = 'passenger-input'
                type = 'number' 
                min = { 0 }
                max = { 9 } 
                placeholder = { '0' }
                onChange = { onChange }
            />
        </div>
    );
};

export default NumberOfPassengersSelect;