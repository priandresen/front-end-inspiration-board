import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import BoardList from './components/BoardList.jsx'
import NewBoardForm from './components/NewBoardForm.jsx'
import NewCardForm from './components/NewCardForm.jsx'
import './App.css'
import CardList from './components/CardList';

const kbaseURL = 'https://back-end-inspiration-board-c6cv.onrender.com/';
// const kbaseURL = 'http://127.0.0.1:5000';


//getAllBoardsAPi
const getAllBoardsAPI = () => {
  return axios.get(`${kbaseURL}/boards`)
  .then(response => response.data)
  .catch(error => console.error(error))
};

//convertFromAPI
const convertFromAPI = (apiCard) => {
  const newCard = {
    ...apiCard,
    likesCount: apiCard.likes_count,
    boardId: apiCard.board_id,
  };

  delete apiCard.likes_count;
  delete apiCard.board_id;

  return newCard;
};

//onRemoveCardAPI
const onRemoveCardAPI = (id) => {
  return axios
  .delete(`${kbaseURL}/cards/${id}`)
  .catch((error) => console.error(error));
};


//onRemoveBoardAPI
const onRemoveBoardAPI = (id) => {
  return axios
  .delete(`${kbaseURL}/boards/${id}`)
  .catch((error) => console.error(error));
};


//onLikeCardAPI
//postCardAPI
//getallboards


//getcardsforboard
const onLikeCardAPI = (id) => {
  return axios
  .patch(`${kbaseURL}/cards/${id}/like`)
  .catch((error) => console.error(error));
}

//postCardAPI -----Nadia
// const addCardAPI = (newCard) => {
//   return axios.post(`${kbaseURL}/cards`, newCard)
//     .then(response => response.data);
// };

// //get all cards??
// const getAllCardsAPI = () => {
//   return axios.get(`${kbaseURL}/cards`)
//   .then(response => response.data)
//   .catch(error => console.error(error))
// }

//getcardsforboard
//onlikechangelikecount
//onLikeCardAPI

//converttoapiboard
//converttapiocard


const convertCardToAPI = (newCard) => {
  return {
    message: newCard.message,
    board_id: newCard.boardId,
  };
};

//onhandlesubmitnewcard
const onHandleSubmitNewCard = (id) => {
  return axios
  .then 
}



function App() {
  const [boards, setBoards] = useState([]);
  const [selectedBoard, setSelectedBoard] = useState(null);


  //setSelectedBoard
  //selectedBoard

  const onSelectBoard = (boardId) => {
    const board = boards.find((board) => board.id === boardId);
    setSelectedBoard(board);
  };


  const getAllBoards = () => {
    return getAllBoardsAPI()
    .then((boardFromAPI) => {
      const newBoard = boardFromAPI.map(convertFromAPI);
      setBoards(newBoard);
    }); 
    };

    useEffect(() => {
      getAllBoards();
    }, []);

    //ondeletecard
  const onDeleteCard = (id) => {
    onRemoveCardAPI(id).then(() => {
      setBoards((boards) => boards.cards.filter((card) => card.id !== id));
    });
  };
  
  const onHandleSubmitCard = (newCard) => {
    return axios.post(`${kbaseURL}/boards/${selectedBoard.id}/cards/`, convertCardToAPI(newCard))
    .then((response) => {
      setSelectedBoard((selectedBoard) => ({ 
        ...selectedBoard, 
        cards: [...selectedBoard.cards, convertFromAPI(response.data)]
      }));
    })
    .catch((error) => console.error(error));
  };
  
  const onHandleSubmitBoard = (newBoard) => {
    return axios.post(`${kbaseURL}/boards`, newBoard)
    .then((response) => {
      setBoards((boards) => [...boards, convertFromAPI(response.data)]);
    })
    .catch((error) => console.error(error));
  };  
  
  const onLikeCard = (boardId, cardId) => {
    onLikeCardAPI(cardId).then(() => {
      setSelectedBoard((selectedBoard) => {
        const updatedCards = selectedBoard.cards.map((card) => {
          if (card.id === cardId) {
            return { ...card, likesCount: card.likesCount + 1 };
          }
          return card;
        });
        return { ...selectedBoard, cards: updatedCards };
      });
    });
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Inspiration Board</h1>
      </header>
      <main>
        <div>
          <BoardList
            boards={boards}
            onSelectBoard={onSelectBoard}      
          />
        </div>
        <div>
          <CardList
            cards={selectedBoard ? selectedBoard.cards : []}
            boardId={selectedBoard ? selectedBoard.id : null}
            onDeleteCard={onDeleteCard}
            onLikeCard={onLikeCard}
          />
        </div>
        <div>

          <NewBoardForm
            onHandleSubmit={onHandleSubmitBoard}
          />
        </div>
        <div>
          <NewCardForm
            onHandleSubmit={onHandleSubmitCard}
            boardId={selectedBoard ? selectedBoard.id : null}
          />
          </div>
      </main>
    </div>
  );
};

export default App;
