import React from 'react';
export default () => {

    return <div>
        <div className="flex">
            <div className="relative lg:ml-36 lg:mt-56 md:ml-24 md:mt-36">
                <div className="w-auto">
                    <h1 className="md:text-4xl lg:text-6xl font-black text-gray-800">I'm Souvik</h1>
                    <h2 className="md:text-xl lg:text-2xl font-bold text-gray-600 text-right">Nice to meet you!</h2>
                </div>
            </div>
            <div className="flex-1" />
            <div className="p-4">
                <img src="/landing-logo.svg" alt="landing-logo" />
            </div>
        </div>
    </div>
}