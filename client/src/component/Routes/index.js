import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from '../../pages/Home';
import Profil from '../../pages/Profil';
import Trending from '../../pages/Trending';
import NavBar from '../NavBar';

const index = () => {
    return (
            <BrowserRouter>
                <NavBar />
                <Routes>
                    <Route path = '/' exact element= {<Home />}/>
                    <Route path = '/profil' exact element= {<Profil />}/>
                    <Route path = '/trending' exact element= {<Trending />}/>
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </BrowserRouter>
    );
};

export default index;