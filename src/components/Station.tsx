import React from 'react';
import { useParams } from 'react-router-dom';

const Station: React.FC = () => {
    const { id } = useParams();
    return (
        <div>
            <h1> Under Construction! </h1>
            Station {id}!
        </div>
    );
};

export default Station;