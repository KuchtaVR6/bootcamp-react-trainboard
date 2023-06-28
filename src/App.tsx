import React from 'react';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import './App.css';
import MainPage from './components/MainPage';
import Station from './components/Station';
import Stations from './components/Stations';

const App = () => (
    <BrowserRouter>
        <div className = "App">
            <Routes>
                <Route path = "/stations">
                    <Route path = ":id" element = { <Station/> }/>
       
                    <Route index element = { <Stations/> }/>
                </Route>
                <Route path = "/" element = { <MainPage/> }/>
            </Routes>
        </div>
    </BrowserRouter>
);

export default App;
