import React from 'react';
import TrainBoard from './TrainBoard';
import UserInputFormArea from './UserInputFormArea';

const MainPage: React.FC = () => {

    return (
        <>
            <div className = "user-area-form-container">
                <UserInputFormArea />
            </div>
            <div className = "train-board-container">
                <TrainBoard />
            </div>
        </>
    );
};

export default MainPage;