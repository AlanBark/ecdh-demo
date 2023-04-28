import './App.css'
import EcdhGraph from './components/EcdhGraph'
import React, { useState, useEffect } from 'react'
import { MathComponent } from 'mathjax-react'

function App() {

  const [a, seta] = useState('5');
  const [b, setb] = useState('9');
  const [p, setp] = useState('13');

  const [Q, setQ] = useState<number[]>([]);
  const [P, setP] = useState<number[]>([]);
  const [addToggle, setAddToggle] = useState<number>(0);

  const [points, setPoints] = useState<number[][]>([]);
  const [clicked, setClicked] = useState<number[]>([]);

  function addPoints (P: number[], Q: number[]) {
    let pInt = parseInt(p);
    let s = ((Q[1] - P[1]) * Math.pow(Q[0] - P[0], -1) % pInt) % pInt;
    let Rx = (Math.pow(s, 2) - P[0] - Q[0]) % pInt;
    let Ry = (-P[1] + s * (P[0] - Rx)) % pInt;
    return [Rx, Ry];
  }

  function displayResult (P: number[], Q: number[]) {
    let result = addPoints(P, Q);
    return <span> ({result[0]}, {result[1]}) </span>
  }

  useEffect(() => {
    console.log('Q: ', Q);
    console.log('P: ', P);
  }, [Q, P]);

  useEffect(() => {
    if (addToggle === 1) {
      setP(clicked);
      setAddToggle(2);
    }
    else if (addToggle === 2) {
      setQ(clicked);
      setAddToggle(3);
    }
  }, [clicked]);

  return (
    <div className="App">
      <div></div>
      <section>
        <h1>Elliptic Curve Multiplication and Addition over a Finite Field</h1>
        <p>Elliptic Curves typically follow the form:</p>
        <MathComponent tex={String.raw`E: y^2 = x^3 + ax + b \mod p`} />
        <p>Where p is a prime number </p>
      </section>
      <div className="graphInputs">
        <div className="label">
          <label>a:</label>
          <input onChange={e => seta(e.target.value)} value={a}/>
        </div>
        <div className="label">
          <label>b:</label>
          <input onChange={e => setb(e.target.value)} value={b} />
        </div>
        <div className="label">
          <label>p:</label>
          <input onChange={e => setp(e.target.value)} value={p} />
        </div>
      </div>
      <div className="graph-info">
        <div className="points">
          <h2>Points on the curve:</h2>
          {points.map((point, index) => {
            return <span key={index}> ({point[0]}, {point[1]}) </span>
          })}
        </div>
        <EcdhGraph a={a} b={b} p={p} points={points} setPoints={setPoints} setClicked={setClicked}/>
        <div>
          <h2>Addition</h2>
          { !addToggle && <button onClick={() => {setAddToggle(1)}}>Start</button> }
          { addToggle === 1 && <p>Select first point</p>}
          { addToggle === 2 && <><p>{P[0]},{P[1]}</p><p>Select second point</p></>}
          { addToggle === 3 && <><p>{P[0]},{P[1]}</p><p>{Q[0]},{Q[1]}</p><p>Result: {displayResult(P, Q)}</p><button onClick={() => {setAddToggle(1)}}>Reset</button></>}
        </div>
      </div>
    </div>
  )
}

export default App
