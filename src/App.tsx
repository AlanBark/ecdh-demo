import './App.css'
import Grid from './components/Grid'

function App() {
  return (
    <div className="App">
      <Grid col={3} row={3} points={[[0, 0], [1,1], [2, 2], [3, 3]]} offset={20} />
    </div>
  )
}

export default App
