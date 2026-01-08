import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import BoardList from './components/BoardList.jsx'
import NewBoardForm from './components/NewBoardForm.jsx'
import NewCardForm from './components/NewCardForm.jsx'
import './App.css'
import CardList from './components/CardList';

import Dropdown from 'react-bootstrap/Dropdown';


const kbaseURL = 'https://back-end-inspiration-board-c6cv.onrender.com';
// const kbaseURL = 'http://127.0.0.1:5000';


//getAllBoardsAPi
const getAllBoardsAPI = () => {
  return axios.get(`${kbaseURL}/boards`)
  .then(response => response.data);
};

//convertFromAPI
const convertCardFromAPI = (apiCard) => {
  const newCard = {
    ...apiCard,
    likesCount: apiCard.likes_count,
    boardId: apiCard.board_id,
  };

  delete newCard.likes_count;  //not apiCard.likes_count
  delete newCard.board_id; // not apiCard.board_id

  return newCard;
};

//onRemoveCardAPI
const onRemoveCardAPI = (id) => {
  return axios
  .delete(`${kbaseURL}/cards/${id}`);
};


//onRemoveBoardAPI
const onRemoveBoardAPI = (id) => {
  return axios
  .delete(`${kbaseURL}/boards/${id}`);
};

//getcardsforboard
const onLikeCardAPI = (id) => {
  return axios
  .patch(`${kbaseURL}/cards/${id}/like`)
  .then(response => response.data);
};

const getCardsForBoardAPI = (boardId, sort) => {
  return axios
    .get(`${kbaseURL}/boards/${boardId}/cards`, { params: { sort } })
    .then(response => response.data.cards)
};


function App() {
  const [boards, setBoards] = useState([]);
  const [selectedBoard, setSelectedBoard] = useState(null);
  const [cards, setCards] = useState([]);
  const [newBoard, setNewBoard] = useState(false);
  const [newCard, setNewCard] = useState(false);
  const [cardSort, setCardSort] = useState("id");


  const onSelectBoard = (boardId) => {
    const board = boards.find((board) => board.id === boardId);
    setSelectedBoard(board);
  };

  const getCardsForBoard = (boardId, sort) => {
    return getCardsForBoardAPI(boardId, sort)
    .then((cardsFromAPI) => {
      const newCards = cardsFromAPI.map(convertCardFromAPI);
      setCards(newCards);
    })
    .catch(error => console.error(error));
  };

  useEffect(() => {
    if (selectedBoard) {
      getCardsForBoard(selectedBoard.id, cardSort);
    }
  }, [selectedBoard, cardSort]);

  const getAllBoards = () => {
    return getAllBoardsAPI()
    .then((boardFromAPI) => {
      const newBoard = boardFromAPI.map(board => ({
        ...board,
      }));
      setBoards(newBoard);
    })
    .catch(error => console.error(error)); 
    };

    useEffect(() => {
      getAllBoards();
    }, []);

    //ondeletecard
  const onDeleteCard = (id) => {
    return onRemoveCardAPI(id).then(() => {
      setCards((cards) => cards.filter((card) => card.id !== id));
    })
    .catch((error) => console.error(error));
  };

  const onDeleteBoard = (id) => {
    return onRemoveBoardAPI(id).then(() => {
      setBoards((boards) => boards.filter((board) => board.id !== id));
      if (selectedBoard && selectedBoard.id === id) {
        setSelectedBoard(null);
        setCards([]);
      }
    })
    .catch((error) => console.error(error));
  };

  const onDeleteCardsInBoard = (boardId) => {
  return axios
    .delete(`${kbaseURL}/boards/${boardId}/cards`)
    .then(() => {
      setCards([]); // clear frontend state
    })
    .catch((error) => console.error(error));
};
  
  const onHandleSubmitCard = (newCard) => {
    const payload = { 
    message: newCard.message,
    board_id: selectedBoard.id,
  };
    
    return axios.post(`${kbaseURL}/cards`, payload)
    .then((response) => {
      setCards((cards) => [...cards, convertCardFromAPI(response.data)]);
      return response.data;
    });
  };
  
  const onHandleSubmitBoard = (newBoard) => {
    return axios.post(`${kbaseURL}/boards`, newBoard)
    .then((response) => {
      setBoards((boards) => [...boards, response.data]);
      return response.data;
    });
  };
  
  const onLikeCard = (cardId) => { // Best practice: use the server response
    return onLikeCardAPI(cardId)
      .then((updatedFromAPI) => {
        const updated = convertCardFromAPI(updatedFromAPI);
        setCards((cards) =>
          cards.map((card) => (card.id === cardId ? updated : card))
      );
    })
    .catch((error) => console.error(error));
  };

  const closeOverlays = () => {
    if (newCard) setNewCard(false);
    if (newBoard) setNewBoard(false);
  };

  const stopClick = (e) => e.stopPropagation();


//   return (
//     <div className="App">
//       <header className="App-header">
//         <h1>Inspiration Board</h1>
//       </header>
//       <main onClick={closeOverlays}>
//         <div>
//           { !selectedBoard && 
//             <>
//               <BoardList 
//               boards={boards}
//               onSelectBoard={onSelectBoard}
//               onDeleteBoard={onDeleteBoard}     
//             />
//             </>
//           }
//           { selectedBoard && 
//             <div>
//               <h2> {selectedBoard.title} </h2>
//               <p> by {selectedBoard.owner}</p>
//               <button onClick={() => setSelectedBoard(null)}> back </button>
//             <div>
//             <CardList
//               cards={selectedBoard ? cards : []}
//               onDeleteCard={onDeleteCard}
//               onLikeCard={onLikeCard}
//               onDeleteCardsInBoard={onDeleteCardsInBoard}
//               boardId={selectedBoard.id}
//             />
//         </div>
//             </div>
//           }
//         </div>

//         <div>
//           {! selectedBoard && !newBoard 
//           && (<button onClick={() => setNewBoard(true)}> + </button>)}
//           { !selectedBoard && newBoard && (
//           <NewBoardForm
//             onHandleSubmit={onHandleSubmitBoard}
//           />) 
//           }
//         </div>
//       {selectedBoard && !newCard 
//       && (<button onClick={() => setNewCard(true)}> + </button>)}
//         {selectedBoard && newCard ? (
//           <NewCardForm onHandleSubmit={onHandleSubmitCard} />
//         ) : (
//           <p>Select a board to add cards.</p>
//         )}
//       </main>
//     </div>
//   );
// };

  return (
    <div className="App">
      <header className="App-header" onClick={closeOverlays}>
        <h1>Inspiration Board</h1>
      </header>

      <main onClick={closeOverlays}>
        <div>
          {!selectedBoard && (
            <>
              <BoardList
                boards={boards}
                onSelectBoard={onSelectBoard}
                onDeleteBoard={onDeleteBoard}
              />
              <p>Select a board to view cards</p>
            </>
          )}

          {selectedBoard && (
            <div>
              <h2>
                Selected Board: {selectedBoard.title} by {selectedBoard.owner}
              </h2>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedBoard(null);
                  setCards([]);
                  setNewCard(false);
                }}
              >
                Back
              </button>

              <fieldset onClick={(e) => e.stopPropagation()}>
                <legend>Sort cards</legend>

                <label>
                  <input
                    type="radio"
                    name="cardSort"
                    value="id"
                    checked={cardSort === "id"}
                    onChange={(e) => setCardSort(e.target.value)}
                  />
                  Sort by ID
                </label>

                <label>
                  <input
                    type="radio"
                    name="cardSort"
                    value="alpha"
                    checked={cardSort === "alpha"}
                    onChange={(e) => setCardSort(e.target.value)}
                  />
                  Sort alphabetically
                </label>

                <label>
                  <input
                    type="radio"
                    name="cardSort"
                    value="likes"
                    checked={cardSort === "likes"}
                    onChange={(e) => setCardSort(e.target.value)}
                  />
                  Sort by +1s
                </label>
              </fieldset>
              
              <CardList
                cards={cards}
                onDeleteCard={onDeleteCard}
                onLikeCard={onLikeCard}
                onDeleteCardsInBoard={onDeleteCardsInBoard}
              />
            </div> 
          )}
        </div>

        <div>
          {!selectedBoard && !newBoard && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setNewBoard(true);
              }}
            >
              +
            </button>
          )}

          {!selectedBoard && newBoard && (
            <div onClick={stopClick}>
              <NewBoardForm onHandleSubmit={onHandleSubmitBoard} />
            </div>
          )}
        </div>

        {selectedBoard && !newCard && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              setNewCard(true);
            }}
          >
            +
          </button>
        )}

        {selectedBoard && newCard && (
          <div onClick={stopClick}>
            <NewCardForm onHandleSubmit={onHandleSubmitCard} />
          </div>
        )}
          {!selectedBoard && <p>Select a board to view cards.</p>}
      </main>
    </div>
  );
}

export default App;