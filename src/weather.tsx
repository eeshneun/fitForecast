import { fetchWeatherApi } from "openmeteo";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

const params = {
    "latitude": 42.34,
    "longitude": -71.09,
    "current": ["temperature_2m", "apparent_temperature", "precipitation"],
    "hourly": ["temperature_2m", "apparent_temperature", "precipitation"],
    "daily": ["temperature_2m_max", "temperature_2m_min"],
    "temperature_unit": "fahrenheit",
    "wind_speed_unit": "mph",
    "precipitation_unit": "inch",
    "timezone": "auto"
};

interface Props {
    currentTemperature: number | null;
    setCurrentTemperature: Dispatch<SetStateAction<number | null>>
}

export default function Weather({currentTemperature, setCurrentTemperature}: Props) {

    const [latitude, setLatitude] = useState();
    const [longitude, setLongitude] = useState();
    // const [currentTemperature, setCurrentTemperature] = useState<number | null>(null);

    useEffect(() => {
        async function fetch() {
            const responses = await fetchWeatherApi("https://api.open-meteo.com/v1/gfs", params)

            const response = responses[0];

            const utcOffsetSeconds = response.utcOffsetSeconds();

            const current = response.current();

            if (current) {
                const currentTemp = {
                    time: new Date((Number(current.time()) + utcOffsetSeconds) * 1000),
                    temperature2m: current.variables(0)!.value(),
                    apparentTemperature: current.variables(1)!.value(),
                    precipitation: current.variables(2)!.value(),
                }
                setCurrentTemperature(currentTemp.temperature2m);
            } else {
                console.log("current does not exist")
            }

             
        }

        fetch()

            // .then((responses : any) => responses[0])
            // .then((response) => {
            //     console.log(response)
            //     //  setLatitude(response.latitude)
            //     //  setLongitude(response.longitude)
            //       setTimezone(response.timezone())
            //       console.log(timezone)
            // })
    }, [])

    return <>{currentTemperature && currentTemperature} °F</>
}
