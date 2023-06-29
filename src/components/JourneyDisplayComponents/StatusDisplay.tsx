import React from 'react';
import { HiCheckCircle, HiExclamationCircle, HiXCircle } from 'react-icons/hi';
import { MdGroupOff } from 'react-icons/md';

interface StatusArgs {
    status: string;
}

const StatusDisplay: React.FC<StatusArgs> = ({ status }) => {

    status = 'cancelled';

    return (
        <span className = 'status-container' 
            style = { { backgroundColor: status!=='normal'? '#F4442E' : '#187795' } }>
            {status === 'normal' ?
                <HiCheckCircle /> :
                status === 'cancelled' ?
                    <HiXCircle /> :
                    status === 'fully_reserved' ?
                        <MdGroupOff /> :
                        <HiExclamationCircle />
            }
            <span className = 'status-text'>
                {status === 'normal' ?
                    ' On time' :
                    status === 'delayed' ?
                        ' Delayed' :
                        status === 'cancelled' ?
                            ' Cancelled' :
                            status === 'fully_reserved' ?
                                ' Fully Reserved' :
                                status
                }
            </span>
        </span>
    );
};

export default StatusDisplay;