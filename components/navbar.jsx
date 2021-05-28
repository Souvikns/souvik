import React from 'react';
import useAvatar from '../lib/hooks/useAvatar';
export default () => {
    let avatar = useAvatar();
    return <div className="py-6">
        <div className="flex">
            <div className="">
                <a href="/">
                    <img src={avatar} alt="avatar" width="50" />
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