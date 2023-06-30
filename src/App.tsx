import React from 'react';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import './App.css';
import MainPage from './components/MainPage';

const App = () => (
    <BrowserRouter>
        <div className = "App">
            <Routes>
                <Route path = "/stations">
                </Route>
                <Route path = "/" element = { <MainPage/> }/>
            </Routes>
        </div>
    </BrowserRouter>
);

export default App;
