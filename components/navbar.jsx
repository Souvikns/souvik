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
            <div className="mr-10 self-center">
                <a href="https://souvikns.hashnode.dev/">
                    <h1 className="text-xl lg:text-2xl font-black text-gray-600">Blog</h1>
                </a>
            </div>
            <div className="self-center">
                <a href="text-xl lg:https://github.com/Souvikns">
                    <h1 className="text-2xl font-black text-gray-600">GitHub</h1>
                </a>
            </div>
        </div>
    </div>
}