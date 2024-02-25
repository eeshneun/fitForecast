import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import DayView from './dayView'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <DayView/>
    </>
  )
}

export default App
