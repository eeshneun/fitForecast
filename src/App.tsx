import DayView from './dayView'
import WeekView from './weekView';
import { Routes, Route, Outlet, Link, BrowserRouter } from "react-router-dom";

import './App.css'
//import ApiTest from './apiTest'


function App() {

  return (

    <BrowserRouter>
      <Routes>
        <Route index element={<DayView />}/>
       <Route path="weekView"  element={<h1>WeekView</h1>}/>
      </Routes>
    </BrowserRouter>

  )
}

export default App
