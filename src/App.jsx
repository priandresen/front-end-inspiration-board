import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <header className="App-header">
        <h1>Inspiration Board</h1>
      </header>
      <main>
        <div>
          <p>board</p>
        </div>
        <div>
          <p>card</p>
        </div>
      </main>
    </div>
  );
};

export default App
