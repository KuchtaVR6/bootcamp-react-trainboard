import React from 'react';
import { HiCheckCircle, HiExclamationCircle, HiXCircle } from 'react-icons/hi';
import { MdGroupOff } from 'react-icons/md';

interface StatusArgs {
    status: string;
}

const StatusDisplay: React.FC<StatusArgs> = ({ status }) => {

    return (
        <span className = { 'status-container ' + (status!=='normal'? 'warning-tag' : '') }>
            {status === 'normal' ?
                <><HiCheckCircle /> On Time</> :
                status === 'cancelled' ?
                    <><HiXCircle /> Cancelled</> :
                    status === 'fully_reserved' ?
                        <><MdGroupOff /> Fully Reserved</> :
                        status === 'delayed' ?
                            <><HiExclamationCircle/> Delayed</> :
                            <><HiExclamationCircle />{status}</>
            }
        </span>
    );
};

export default StatusDisplay;