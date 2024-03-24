import DayView from './dayView'
import WeekView from './weekView';
import HomePage from './homePage';
import { Routes, Route, Outlet, Link, BrowserRouter } from "react-router-dom";

import './App.css'
import { SetStateAction, useState } from 'react';
import { Coordinates } from './input';
//import ApiTest from './apiTest'


function App() {


  const [userLoc, setUserLoc] = useState<Coordinates | null>(null);

  return (

    <BrowserRouter>
      <Routes>
        <Route index element={<HomePage />}/>
        <Route path="/dayView"  element={<DayView userLoc={userLoc} setUserLoc={setUserLoc} />}/>
       <Route path="/weekView"  element={<WeekView userLoc={userLoc} setUserLoc={setUserLoc} />}/>
      </Routes>
    </BrowserRouter>

  )
}

export default App
