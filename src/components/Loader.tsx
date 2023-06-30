import React from 'react';
import { GrTrain } from 'react-icons/gr';

interface LoaderArgs {
    size? : string;
    background? : boolean;
}

const Loader: React.FC<LoaderArgs> = ({ background, size }) => {
    return (    
        <div 
            className = { 'train-board-container train-board-container-loading' + (background? 'with-background' : '') }
            style = { { backgroundColor: background? '#CDC6AE' : 'unset' } } 
        >
            <GrTrain 
                className = 'loader' 
                style = { { width : size, height : size } }
            />
        </div>
    );
};

export default Loader;