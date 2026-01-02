import { useState } from 'react'
import './App.css'
import CardList from './components/CardList';

const kbaseURL = 'https://back-end-inspiration-board-c6cv.onrender.com/';

//getAllBoardsAPi
//convertFromAPI
//onRemoveCardAPI
//onLikeCardAPI


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
          <CardList
          />
        </div>
      </main>
    </div>
  );
};

export default App
