import React from 'react';
import Navbar from '../components/navbar';
import Landing from '../components/landing';
import HSpacing from '../components/hspacing';
import Education from '../components/education';

export default () => {
    return <div className="px-12 sm:px-20 lg:px-64">
        <Navbar />
        <HSpacing section />
        <Landing />
        <HSpacing section />
        <Education />
    </div>
}