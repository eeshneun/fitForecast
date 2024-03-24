import { useState } from 'react'
import './homePage.css'
import Input from './input'


function HomePage() {

    const [location, setLocation] = useState(String)

 
    // document.getElementById("date").innerHTML = today;
    
    

   return (
    <div>
    <h1 id="title">FITFORECAST</h1>
    <p>Home Page</p>
    <a href='/dayView' className= "button">Go to Day View</a>
    <a href='/weekView' className= "button">Go to Week View</a>

    </div>
    )

}



export default HomePage