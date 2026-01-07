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
const convertCardFromAPI = (apiCard) => {
  const newCard = {
    ...apiCard,
    likesCount: apiCard.likes_count,
    boardId: apiCard.board_id,
  };

  delete apiCard.likes_count;
  delete apiCard.board_id;

  return newCard;
};

//convertToAPI
const convertCardToAPI = (apiCard) => {
  const newCard = {
    ...apiCard,
    likes_count: apiCard.likesCount,
    board_id: apiCard.boardId,
  };

  delete apiCard.likesCount;
  delete apiCard.boardId;

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


// const convertCardToAPI = (newCard) => {
//   return {
//     message: newCard.message,
//     board_id: newCard.boardId,
//   };
// };

//onhandlesubmitnewcard
// const onHandleSubmitNewCard = (id) => {
//   return axios
//   .then 
// }

const getCardsForBoardAPI = (boardId) => {
  return axios.get(`${kbaseURL}/boards/${boardId}/cards`)
  .then(response => response.data.cards)
  .catch(error => console.error(error))
};


function App() {
  const [boards, setBoards] = useState([]);
  const [selectedBoard, setSelectedBoard] = useState(null);
  const [cards, setCards] = useState([]);


  //setSelectedBoard
  //selectedBoard

  const onSelectBoard = (boardId) => {
    const board = boards.find((board) => board.id === boardId);
    setSelectedBoard(board);

  };

  const getCardsForBoard = (boardId) => {
    return getCardsForBoardAPI(boardId)
    .then((cardsFromAPI) => {
      const newCards = cardsFromAPI.map(convertCardFromAPI);
      setCards(newCards);
    });
  };

  useEffect(() => {
    if (selectedBoard) {
      getCardsForBoard(selectedBoard.id);
    }
  }, [selectedBoard]);

  const getAllBoards = () => {
    return getAllBoardsAPI()
    .then((boardFromAPI) => {
      const newBoard = boardFromAPI.map(board => ({
        ...board,
      }));
      setBoards(newBoard);
    }); 
    };

    useEffect(() => {
      getAllBoards();
    }, []);

    //ondeletecard
  const onDeleteCard = (id) => {
    onRemoveCardAPI(id).then(() => {
      setCards((cards) => cards.filter((card) => card.id !== id));
    });
  };

  const onDeleteBoard = (id) => {
    onRemoveBoardAPI(id).then(() => {
      setBoards((boards) => boards.filter((board) => board.id !== id));
      if (selectedBoard && selectedBoard.id === id) {
        setSelectedBoard(null);
        setCards([]);
      }
    });
  };
  
  const onHandleSubmitCard = (newCard) => {
    return axios.post(`${kbaseURL}/boards/${selectedBoard.id}/cards/`, convertCardToAPI(newCard))
    .then((response) => {
      setCards((cards) => [...cards, convertCardFromAPI(response.data)]);
    })
    .catch((error) => console.error(error));
  };
  
  const onHandleSubmitBoard = (newBoard) => {
    return axios.post(`${kbaseURL}/boards`, newBoard)
    .then((response) => {
      setBoards((boards) => [...boards, response.data]);
    })
    .catch((error) => console.error(error));
  };
  
  const onLikeCard = (cardId) => {
    onLikeCardAPI(cardId).then(() => {
      setCards((cards) => {
        const updatedCards = cards.map((card) => {
          if (card.id === cardId) {
            return { ...card, likesCount: card.likesCount + 1 };
          }
          return card;
        });
        return updatedCards;
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
            onDeleteBoard={onDeleteBoard}     
          />
        </div>
        <div>
          <CardList
            cards={selectedBoard ? cards : []}
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
