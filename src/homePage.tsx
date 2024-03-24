import { useState } from 'react'
import './homePage.css'
import Input, { Coordinates } from './input'

type Props = {
    userLoc: Coordinates | null;
    setUserLoc: React.Dispatch<React.SetStateAction<Coordinates | null>>

}
function HomePage({ userLoc, setUserLoc }: Props) {

    const [location, setLocation] = useState(String)

 
    // document.getElementById("date").innerHTML = today;
    
    

   return (
    <div>   
    <h1 id="title">FITFORECAST</h1>
    <p id="statement">Enter your location coordinates:</p>
    <Input setUserLoc={setUserLoc} />
    <a href='/dayView' className= "button">Go to Day View</a>
    <a href='/weekView' className= "button">Go to Week View</a>

    </div>
    )

}



export default HomePage