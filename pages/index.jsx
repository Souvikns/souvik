import React from 'react';
import Navbar from '../components/navbar';
import Landing from '../components/landing';
import Education from '../components/education';
import Aboutme from '../components/aboutme';
import Footer from '../components/footer';

export default () => {
    return <div>
        <div className="px-12 md:px-20 lg:px-64">
            <div>
                <Navbar />
            </div>
            <div className="my-32">
                <Landing />
            </div>
            <div className="my-12">
                <Education />
            </div>
            <div className="my-24">
                <Aboutme />
            </div>
        </div>
        <div className="mt-12">
            <Footer />
        </div>
    </div>


}