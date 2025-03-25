import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import TaskList from './Components/TaskList'
import TaskInput from './Components/TaskInput'
import Navbar from './Components/Navbar'
import { useSelector } from 'react-redux'
import AuthButton from './Components/Authbutton'


function App() {

  const { isAuthenticated } = useSelector((state) => state.auth);
  if (!isAuthenticated) {
    return (
      <>
        <AuthButton />
      </>)
  } else {

    return (
      <>
        <div className="container w-full h-full m-auto md:w-[70%]  md:my-5 rounded-3xl p-5 bg-violet-100">
          <Navbar />
          <AuthButton />
          <TaskInput />
          <TaskList />
        </div>

      </>
    )
  }
}

export default App
