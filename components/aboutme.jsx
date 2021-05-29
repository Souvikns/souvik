import React from 'react';
import HSpacing from './hspacing';

export default () => {
    return <div className="py-2 shadow">
        <div>
            <center>
                <img src="/aboutme.svg" alt="aboutme" width="40%" />
            </center>
        </div>

        <HSpacing />

        <div className="flex">
            <div className="flex-1"/>
            <div className="text-xl font-mono text-gray-600">
                <p>
                    I am undergrad software developer pursing my B-Tech degree from <a className="bold text-red-400" target="_blank" href="https://www.cuchd.in/">Chandigarh University</a>.
                </p>
                <p>I love open source and spend my days coding.</p>
                <p>I co founded <a className="bold text-red-400" target="_blank" href="https://github.com/tech-Phantoms/">TechPhantoms</a>, an open source community for college students.</p>
                <p>My favorite beverage is ☕</p>
            </div>
            <div className="flex-1" />
        </div>

    </div>
}