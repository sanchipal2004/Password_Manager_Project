import { useState } from 'react'
import './App.css'
import Navbar from './assets/components/Navbar'
import Manager from './assets/components/components/Manager'
import Down from './assets/components/down'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Navbar />
      <div className=' bg-white bg-[radial-gradient(60%_120%_at_50%_50%,hsla(0,0%,100%,0)_0,rgba(252,205,238,.5)_100%)]'>
      <Manager />
      </div>
      <Down />


    </>
  )
}

export default App
