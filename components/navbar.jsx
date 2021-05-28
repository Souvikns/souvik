import React from 'react';
export default () => {
    return <div className="py-6">
        <div className="flex">
            <div className="">
                <a href="/">
                    <img src="/me.svg" alt="avatar" width="50" />
                </a>
            </div>
            <div className="flex-1" />
            <div className="mr-10">
                <a href="https://souvikns.hashnode.dev/">
                    <h1 className="text-2xl font-black text-gray-600">Blog</h1>
                </a>
            </div>
            <div className="">
                <a href="https://github.com/Souvikns">
                    <h1 className="text-2xl font-black text-gray-600">GitHub</h1>
                </a>
            </div>
        </div>
    </div>
}