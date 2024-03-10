import './dayView.css'
import { Clothes } from './clothes'


export default function WeekView() {

    const today = new Date();
    const temp : number = 73;
    const location : string = "Boston"
    let clothes : Clothes = new Clothes("default","default", "default", "default");
    clothes = clothes.setClothes(temp);
    const top : string = clothes.top;
    const bottom : string = clothes.bottom;
    const outerwear : string = clothes.outerwear;
    const shoes : string = clothes.shoes;
 
    // document.getElementById("date").innerHTML = today;
    
    

   return (
    <div className="headers">
       <div className= "location"><h2>{location}</h2></div>
       <div className= "temp"><h3>{temp} °F</h3></div>

                    <a href ="/weekView">go to week view</a>
                
                <h1>Week View</h1>
            <h2 id="date"> {today.toDateString()} </h2>
            <div className="flexbox-container">
                <div className="box"><b>top:</b> {top}</div>
                <div className="box"><b>bottoms:</b> {bottom}</div>
                <div className="box"><b>outerwear:</b> {outerwear}</div>
                <div className="box"><b>shoes:</b> {shoes}</div> 
            </div>
        </div> 
    )

}
