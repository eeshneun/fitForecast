import './dayView.css'
import { Clothes } from './clothes'
import Weather from './weather';
import { SetStateAction, useState } from 'react';
import Input, { Coordinates } from './input';

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

type Props = {
    userLoc: Coordinates | null;
    setUserLoc: React.Dispatch<React.SetStateAction<Coordinates | null>>

}


function DayView({ userLoc, setUserLoc }: Props) {

    const today = new Date();
    const [currentTemperature, setCurrentTemperature] = useState<number | null>(null);
    const location: string = "Boston"
    let clothes: Clothes = { top: "default", bottom: "default", outerwear: "default", shoes: "default" };
    clothes = tempToClothing(currentTemperature ?? 0);
    const top: string = clothes.top;
    const bottom: string = clothes.bottom;
    const outerwear: string = clothes.outerwear;
    const shoes: string = clothes.shoes;

    // document.getElementById("date").innerHTML = today;



    return (
        <div className="headers">
            <div className="location">
                <h3>{location}</h3>
            </div>
            <div className = "input">
                <p>enter new location coords:</p>
            <Input setUserLoc={setUserLoc} />
            </div>
            <a href='/weekView' className="button">Go to WeekView</a>
            <a href="http://localhost:5173/" className="button">Go to HomePage</a>
            <h2 id="date">{today.toDateString()}</h2>
            <div className="temp">
                <h3><Weather currentTemperature={currentTemperature} setCurrentTemperature={setCurrentTemperature} userLoc={userLoc} /></h3>
            </div>
     
            <div className="flexbox-container">
                <div className="box"><b>top:</b> {top}</div>
                <div className="box"><b>bottoms:</b> {bottom}</div>
                <div className="box"><b>outerwear:</b> {outerwear}</div>
                <div className="box"><b>shoes:</b> {shoes}</div>
            </div>
        </div>
    )
}



export default DayView