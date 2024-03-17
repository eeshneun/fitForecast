import './dayView.tsx'
import { Clothes } from './clothes'
import { useEffect, useState } from 'react';
import { fetchWeatherApi } from 'openmeteo';
import Weather from './weather';


type WeatherForDay = {
    temperature: number;
    date: Date;
}

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
export default function WeekView() {
    const [temperatures, setTemperatures] = useState<WeatherForDay[] | null>(null);
    const today = new Date();
    let tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const temp: number = 73;
    const location: string = "Boston"
    let clothes: Clothes = new Clothes("default", "default", "default", "default");
    clothes = clothes.setClothes(temp);
    const top: string = clothes.top;
    const bottom: string = clothes.bottom;
    const outerwear: string = clothes.outerwear;
    const shoes: string = clothes.shoes;

    // document.getElementById("date").innerHTML = today;

    useEffect(() => {
        async function fetch() {
            const params = {
                "latitude": 52.52,
                "longitude": 13.41,
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
                    temps = [...temps, { temperature: weatherData.hourly.temperature2m[i], date: date }]
                    // console.log(
                    //     new Date(weatherData.hourly.time[i].toISOString()),
                    //     weatherData.hourly.temperature2m[i]
                    // );
                }
            }
            setTemperatures(temps);


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

    return (
        <div className="headers">
            <div className="location"><h2>{location}</h2></div>
            <div className="temp">
            </div>

            <h1>Week View</h1>
            <a href='/dayView' className="button">Go to DayView</a>
            <a href="http://localhost:5173/" className="button">Go to HomePage</a>
            {temperatures && temperatures.map(t => <div>
                <div>{t.temperature}</div>
                <div className="flexbox-container">
                    <div id="date"> {t.date.toDateString()} </div>
                    <div className="temp"><b>top:</b> {top}</div>
                    <div className="box"><b>top:</b> {top}</div>
                    <div className="box"><b>bottoms:</b> {bottom}</div>
                    <div className="box"><b>outerwear:</b> {outerwear}</div>
                    <div className="box"><b>shoes:</b> {shoes}</div>
                </div>


            </div>
            )
            }
            {/* <div className="flexbox-container">
                <div id="date"> {today.toDateString()} </div>
                <div className="temp">
                </div>
                <div className="temp"><b>top:</b> {top}</div>
                <div className="box"><b>top:</b> {top}</div>
                <div className="box"><b>bottoms:</b> {bottom}</div>
                <div className="box"><b>outerwear:</b> {outerwear}</div>
                <div className="box"><b>shoes:</b> {shoes}</div>
            </div> */}
            </div>
    )
}


