import './dayView.css'
import {Clothes} from './clothes'
import Weather from './weather';
import { useState } from 'react';




function DayView() {

    const today = new Date();
    const [currentTemperature, setCurrentTemperature] = useState<number | null>(null);
    const location : string = "Boston"
    let clothes : Clothes = new Clothes("default","default", "default", "default");
    clothes = clothes.setClothes(currentTemperature ?? 0);
    const top : string = clothes.top;
    const bottom : string = clothes.bottom;
    const outerwear : string = clothes.outerwear;
    const shoes : string = clothes.shoes;
 
    // document.getElementById("date").innerHTML = today;
    
    

   return (
    <div className="headers">
       <div className= "temp">
        <Weather currentTemperature={currentTemperature} setCurrentTemperature={setCurrentTemperature} />
        {/* <h3>{currentTemperature} °F</h3> */}
        </div>

<a href='/weekView' class= "button">Go to WeekView</a>
<a href= "http://localhost:5173/" class = "button">Go to HomePage</a>
    
                
                <h1 id="date">{today.toDateString()}</h1>
            <h2 id="location"> {location}</h2>
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