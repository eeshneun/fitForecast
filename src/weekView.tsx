import './dayView.tsx'
import { Clothes } from './clothes'
import { useEffect, useState } from 'react';
import { fetchWeatherApi } from 'openmeteo';
import Weather from './weather';
import Input, { Coordinates } from './input.tsx';


function tempToClothing(temp: number) {
    if (temp > 70) {
        console.log(temp);
        return { top: "short sleeves", bottom: "shorts", outerwear: "none", shoes: "sandals/sneakers" };
    }
    else if (temp <= 70 && temp > 40) {
        console.log(temp);
        return { top: "long sleeves", bottom: "leggings", outerwear: "light jacket", shoes: "sneakers" };
    }
    else {
        console.log(temp);
        return { top: "sweater", bottom: "jeans", outerwear: "heavy jacket", shoes: "boots" };
    }
}
type WeatherForDay = {
    temperature: number;
    date: Date;
    clothing: Clothes;
}

type Props = {
    userLoc: Coordinates | null;
    setUserLoc: React.Dispatch<React.SetStateAction<Coordinates | null>>

}
export default function WeekView({ userLoc, setUserLoc }: Props) {
    const [temperatures, setTemperatures] = useState<WeatherForDay[] | null>(null);
    let tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const location: string = "Boston"

    useEffect(() => {
        async function fetch() {
            const params = {
                "latitude": userLoc ? userLoc.latitude : 0.00,
                "longitude": userLoc ? userLoc.longitude : 0.00,
                "hourly": "temperature_2m",
                "temperature_unit": "fahrenheit"
            };
            const url = "https://api.open-meteo.com/v1/forecast";
            const responses = await fetchWeatherApi(url, params);

            // Helper function to form time ranges
            const range = (start: number, stop: number, step: number) =>
                Array.from({ length: (stop - start) / step }, (_, i) => start + i * step);

            // Process first location. Add a for-loop for multiple locations or weather models
            const response = responses[0];

            // Attributes for timezone and location
            const utcOffsetSeconds = response.utcOffsetSeconds();
            const timezone = response.timezone();
            const timezoneAbbreviation = response.timezoneAbbreviation();
            const latitude = response.latitude();
            const longitude = response.longitude();

            const hourly = response.hourly()!;

            // Note: The order of weather variables in the URL query and the indices below need to match!
            const weatherData = {

                hourly: {
                    time: range(Number(hourly.time()), Number(hourly.timeEnd()), hourly.interval()).map(
                        (t) => new Date((t + utcOffsetSeconds) * 1000)
                    ),
                    temperature2m: hourly.variables(0)!.valuesArray()!,
                },

            };

            // `weatherData` now contains a simple structure with arrays for datetime and weather data
            let temps: WeatherForDay[] = []

            for (let i = 0; i < weatherData.hourly.time.length; i++) {
                const date = new Date(weatherData.hourly.time[i].toISOString())
                if (date.getHours() == 12) {
                    temps = [...temps, {
                        temperature: weatherData.hourly.temperature2m[i], date: date,
                        clothing: tempToClothing(weatherData.hourly.temperature2m[i])
                    }
                    ]

                }


            }
            setTemperatures(temps);

        }

        fetch()
    }, [userLoc?.latitude, userLoc?.longitude])

    return (
        <div className="headers">
            {/* <div className="location"><h3>{location}</h3></div> */}
            <div className="temp">
            </div>
            <div className="input">
                <p>enter your location coords:</p>
                <Input setUserLoc={setUserLoc} />
            </div>
            <h1>Week View</h1>
            <a href='/dayView' className="button">Go to DayView</a>
            <a href="http://localhost:5173/" className="button">Go to HomePage</a>
            {temperatures && temperatures.map(t => <div>
                <div>
                    <b>
                        Daily Average:
                    </b> {Math.floor(t.temperature * 100) / 100} ˚F
                </div>
                <div className="flexbox-container">
                    <div id="date"> {t.date.toDateString()} </div>
                    <div className="box"><b>top:</b> {t.clothing.top}</div>
                    <div className="box"><b>bottoms:</b> {t.clothing.bottom}</div>
                    <div className="box"><b>outerwear:</b> {t.clothing.outerwear}</div>
                    <div className="box"><b>shoes:</b> {t.clothing.shoes}</div>
                </div>
            </div>
            )
            }
        </div>
    )

}


