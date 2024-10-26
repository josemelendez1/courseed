import { useMemo } from "react";
import { createAvatar } from "@dicebear/core";
import * as BigSmile from "@dicebear/big-smile";
import * as Glass from "@dicebear/glass";

const Avatar = ({ username, className }) => {
    const avatar = useMemo(() => {
        return createAvatar(BigSmile, {
            seed: username,
            size: 128,
            backgroundColor: ["b6e3f4", "c0aede", "d1d4f9", "ffd5dc", "ffdfbf"]
        }).toDataUri();
    }, [username]);

    return <img src={avatar} alt={username} className={className} />
}

const Background = ({ username, className }) => {
    const background = useMemo(() => {
        return createAvatar(Glass, {
            seed: username,
            size: 256
        }).toDataUri();
    }, [username]);

    return <img src={background} alt={username} className={className} />
}

export default Avatar;
export { Background };