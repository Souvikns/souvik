import React from 'react';
import HSpacing from './hspacing';

export default () => {
    return <div className="">
        <div>
            <center>
                <img src="/aboutme.svg" alt="aboutme" width="40%" />
            </center>
        </div>

        <HSpacing />

        <div className="mx-32 py-4 px-6 my-4 shadow">
            <ul className="list-disc list-inside text-xl font-mono text-gray-600">
                <li>I am undergrad software developer pursing my B-Tech degree from <a className="bold text-red-400" target="_blank" href="https://www.cuchd.in/">Chandigarh University</a>.</li>
                <li>I love open source and spend most of my day coding.</li>
                <li>I founded <a className="bold text-red-400" target="_blank" href="https://github.com/tech-Phantoms/">TechPhantoms</a>, a open source community for students.</li>
                <li>My favorite beverage is ☕</li>
            </ul>
        </div>
    </div>
}