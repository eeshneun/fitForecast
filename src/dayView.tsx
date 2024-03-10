import './dayView.css'
import {Clothes} from './clothes'
import WeekView from './weekView';




function DayView() {

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
       <div className= "temp"><h3>{temp} °F</h3></div>

                
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