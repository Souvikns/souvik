import React from 'react';
import Navbar from '../components/navbar';
import Landing from '../components/landing';
import Aboutme from '../components/aboutme';
import HSpacing from '../components/hspacing';

export default () => {
    return <div className="sm:px-20">
        <Navbar />
        <HSpacing />
        <Landing />
        <HSpacing section />
        <Aboutme />
    </div>
}