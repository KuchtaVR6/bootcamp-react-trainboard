import React from 'react';

interface NumberOfPassangersSelectArgs {
    passangerType : string;
}

const NumberOfPassangersSelect: React.FC<NumberOfPassangersSelectArgs> = ({ passangerType }) => {
    return (
        <div>
            <label htmlFor = { passangerType }>Select the number of {passangerType}: </label>
            <input id = { passangerType } type = 'number' min = { 0 } max = { 9 } placeholder = { '0' }/>
        </div>
    );
};

export default NumberOfPassangersSelect;