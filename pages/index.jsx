import React from 'react';
import Navbar from '../components/navbar';
import Landing from '../components/landing';
import HSpacing from '../components/hspacing';
import Education from '../components/education';

export default () => {
    return <div>
        <div className="px-12 md:px-20 lg:px-64">
            <div>
                <Navbar />
            </div>
            <div className="my-20">
                <Landing />
            </div>
        </div>
    </div>


}