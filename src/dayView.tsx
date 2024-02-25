import './dayView.css'
function DayView() {

    const today = new Date();
    // document.getElementById("date").innerHTML = today;

    return (


        <div className="headers">
            <h1>Day View</h1>
            <h2 id="date"> {today.toDateString()} </h2>
            <div className="flexbox-container">
                <div className="box">top</div>
                <div className="box">bottom</div>
                <div className="box">outerwear</div>
                <div className="box">shoes</div>
                <div className="box">accessories</div>
            </div>
        </div>
    )

}


export default DayView