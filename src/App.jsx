import { useState, useEffect } from 'react'
import Form from "../components/Form"; 
import Logo from "../components/Logo"
import Output from "../components/Output"
import './App.css'

function App() {
  const [inputToCalculate, setInputToCalculate] = useState({
    day: "", 
    month: "", 
    year: ""
  })

  const receiveValidInputHandler = (input) => {
    setInputToCalculate(prevInput => ({
      ...prevInput, 
      day: input.day, 
      month: input.month, 
      year: input.year
    }));
  }
  {/*
  useEffect(() => {
    // This effect will run whenever inputToCalculate changes
    console.log(inputToCalculate);
  }, [inputToCalculate]);
*/}

  return (
      <div className="app">
        <Form sendValidInputHandler={receiveValidInputHandler}/> 
        <Logo/>
        <Output validInput={inputToCalculate}/>
      </div>
  )
}

export default App
