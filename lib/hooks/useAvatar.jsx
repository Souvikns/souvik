import Axios from 'axios';
import { useEffect, useState } from 'react';

const useAvatar = () => {
    let [avatar, setAvatar] = useState("");
    const fetchAvatar = async () => {
        let res = await Axios({ url: `https://api.github.com/users/Souvikns`, method: "GET" });
        setAvatar(res.data.avatar_url);
    }

    useEffect(() => {
        fetchAvatar();
    }, [])

    return avatar;
}

export default useAvatar;