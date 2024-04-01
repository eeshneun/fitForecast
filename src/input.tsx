import { useState } from "react";
import * as React from 'react';


type Coordinates = {
    longitude: number | undefined;
    latitude: number | undefined;
}

export type { Coordinates }

type Props = {
    // userLoc: Coordinates;
    setUserLoc: React.Dispatch<React.SetStateAction<Coordinates | null>>

}

export default function Input({ setUserLoc }: Props) {
    const [userLong, setUserLong] = useState<number>();
    const [userLat, setUserLat] = useState<number>();
    // const [loc, setLoc] = useState<Coordinates>();

    // console.log(userLong);
    // console.log(userLat);

    return <div>
        <div><input type="number" placeholder="longitude" value={userLong} id= "longitude" onChange={(e) => setUserLong((e.target as any).value)} /></div>
        <div><input type="number" placeholder="latitude" value={userLat} id = "latitude" onChange={(e) => setUserLat((e.target as any).value)} /></div>
        <button
            disabled={userLong == undefined || userLat == undefined}
            onClick={() =>
                setUserLoc({ longitude: userLong, latitude: userLat })

                
            }
        >enter</button>
    </div>;
}