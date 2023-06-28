import React from 'react';
import TrainBoard from './TrainBoard';
import UserInputFormArea from './UserInputFormArea';

const MainPage: React.FC = () => {

    return (
        <>
            <UserInputFormArea />
            <TrainBoard />
        </>
    );
};

export default MainPage;