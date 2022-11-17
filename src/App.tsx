import './App.css'
import EcdhGraph from './components/EcdhGraph'
import React, { useState, useEffect } from 'react'

function App() {

  const [a, seta] = useState('');
  const [b, setb] = useState('');
  const [p, setp] = useState('');

  return (
    <div className="App">
      <div>

      <input onChange={e => seta(e.target.value)}/>
      <input onChange={e => setb(e.target.value)}/>
      <input onChange={e => setp(e.target.value)}/>
      </div>
      <EcdhGraph a={a} b={b} p={p} />
    </div>
  )
}

export default App
