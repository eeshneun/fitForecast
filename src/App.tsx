import DayView from './dayView'
import WeekView from './weekView';
import HomePage from './homePage';
import { Routes, Route, Outlet, Link, BrowserRouter } from "react-router-dom";

import './App.css'
//import ApiTest from './apiTest'


function App() {

  return (

    <BrowserRouter>
      <Routes>
        <Route index element={<HomePage />}/>
        <Route path="/dayView"  element={<DayView />}/>
       <Route path="/weekView"  element={<WeekView />}/>
      </Routes>
    </BrowserRouter>

  )
}

export default App
