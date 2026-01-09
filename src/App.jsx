import { useEffect, useMemo, useState } from "react";
import axios from 'axios'
import BoardList from './components/BoardList.jsx'
import NewBoardForm from './components/NewBoardForm.jsx'
import NewCardForm from './components/NewCardForm.jsx'
import './App.css'
import CardList from './components/CardList';
import CardSort from './components/CardSort.jsx';


const kbaseURL = 'https://back-end-inspiration-board-c6cv.onrender.com';
//const kbaseURL = 'http://127.0.0.1:5000';


const getAllBoardsAPI = () => {
  return axios.get(`${kbaseURL}/boards`)
  .then(response => response.data);
};

const createCardAPI = (payload) =>
  axios.post(`${kbaseURL}/cards`, payload).then((r) => r.data);

const deleteCardAPI = (id) => {
  return axios
  .delete(`${kbaseURL}/cards/${id}`);
};

const createBoardAPI = (payload) =>
  axios.post(`${kbaseURL}/boards`, payload).then((r) => r.data);

const deleteBoardAPI = (id) => {
  return axios
  .delete(`${kbaseURL}/boards/${id}`);
};

const likeCardAPI = (id) => {
  return axios
  .patch(`${kbaseURL}/cards/${id}/like`)
  .then(response => response.data);
};

const getCardsForBoardAPI = (boardId) => {
  return axios
    .get(`${kbaseURL}/boards/${boardId}/cards`)
    .then(response => response.data.cards)
};

const deleteAllCardsInBoardAPI = (boardId) =>
  axios.delete(`${kbaseURL}/boards/${boardId}/cards`);

const convertCardFromAPI = (apiCard) => {
  const newCard = {
    ...apiCard,
    likesCount: apiCard.likes_count,
    boardId: apiCard.board_id,
  };

  delete newCard.likes_count;  
  delete newCard.board_id; 
  return newCard;
};


function App() {
  const [boards, setBoards] = useState([]);
  const [selectedBoard, setSelectedBoard] = useState(null);
  const [cards, setCards] = useState([]);
  
  const [newBoard, setNewBoard] = useState(false);
  const [newCard, setNewCard] = useState(false);
  const [orderedCards, setOrderedCards] = useState(false);
  
  const [cardSort, setCardSort] = useState("id");

  const isCreatingBoard = !selectedBoard && newBoard;
  const isCreatingCard = selectedBoard && newCard;
  const isCreating = isCreatingBoard || isCreatingCard;


  
  const getCardsForBoard = (boardId) => {
    return getCardsForBoardAPI(boardId)
    .then((cardsFromAPI) => {
      const newCards = cardsFromAPI.map(convertCardFromAPI);
      setCards(newCards);
    })
    .catch(error => console.error(error));
  };

  const getAllBoards = () => {
    return getAllBoardsAPI()
    .then((boardFromAPI) => {
      setBoards(boardFromAPI);
    })
    .catch(error => console.error(error)); 
    };

    useEffect(() => {
      getAllBoards();
    }, []);

    useEffect(() => {
    if (selectedBoard) {
      getCardsForBoard(selectedBoard.id);
    }
  }, [selectedBoard]);

  
  const sortedCards = useMemo(() => {
    const copy = cards.slice();

    if (cardSort === "alpha") {
      copy.sort((a, b) => a.message.localeCompare(b.message));
    } else if (cardSort === "likes") {
      copy.sort((a, b) => b.likesCount - a.likesCount);
    } else {
      copy.sort((a, b) => a.id - b.id);
    }

    return copy;
  }, [cards, cardSort]);

  const onSelectBoard = (boardId) => {
    const board = boards.find((board) => board.id === boardId);
    setSelectedBoard(board);
  };

  const onDeleteCard = (id) => {
    return deleteCardAPI(id).then(() => {
      setCards((prev) => prev.filter((card) => card.id !== id));
    })
    .catch((error) => console.error(error));
  };

  const onDeleteBoard = (id) => {
    return deleteBoardAPI(id).then(() => {
      setBoards((prev) => prev.filter((board) => board.id !== id));
      if (selectedBoard && selectedBoard.id === id) {
        setSelectedBoard(null);
        setCards([]);
        setNewCard(false);
      }
    })
    .catch((error) => console.error(error));
  };

  const onDeleteCardsInBoard = (boardId) => {
  return deleteAllCardsInBoardAPI(boardId)
    .then(() => {
      setCards([]);
    })
    .catch((error) => console.error(error));
};
  
  const onHandleSubmitCard = (newCardForm) => {
    const payload = { 
    message: newCardForm.message,
    board_id: selectedBoard.id,
  };
    
  return createCardAPI(payload).then((createdCard) => {
    setCards((prev) => [...prev, convertCardFromAPI(createdCard)]);
    setNewCard(false);
    return createdCard;
  });
};
  
  const onHandleSubmitBoard = (newBoardForm) => {
    const payload = {
      title: newBoardForm.title,
      owner: newBoardForm.owner,
    };
    
    return createBoardAPI(payload).then((createdBoard) => {
    setBoards((prev) => [...prev, createdBoard]);
    setNewBoard(false);
    return createdBoard;
  });
};
  
  const onLikeCard = (cardId) => { 
    return likeCardAPI(cardId)
      .then((updatedFromAPI) => {
        const updated = convertCardFromAPI(updatedFromAPI);
        setCards((prev) =>
          prev.map((card) => (card.id === cardId ? updated : card))
      );
    })
    .catch((error) => console.error(error));
  };

  const closeOverlays = () => {
    if (newCard) setNewCard(false);
    if (newBoard) setNewBoard(false);
  };

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key !== "Escape") return;
      setNewBoard(false);
      setNewCard(false);
      setOrderedCards(false);
    };

    const anyOverlayOpen = newBoard || newCard || orderedCards;
    if (anyOverlayOpen) window.addEventListener("keydown", onKeyDown);

    return () => window.removeEventListener("keydown", onKeyDown);
  }, [newBoard, newCard, orderedCards]);

  const stopClick = (e) => e.stopPropagation();


  return (
  <div className="App">
    <header className="App-header" onClick={closeOverlays}>
      <h1>Inspiration Board!</h1>
    </header>

    <main onClick={closeOverlays}>
      {isCreating ? (
        <div
          className="overlay"
          onClick={() => {
            setNewBoard(false);
            setNewCard(false);
          }}
        >
          <div className="overlay__panel" onClick={stopClick}>
            {isCreatingBoard && (
              <NewBoardForm onHandleSubmit={onHandleSubmitBoard} />
            )}
            {isCreatingCard && (
              <NewCardForm onHandleSubmit={onHandleSubmitCard} />
            )}
          </div>
        </div>
      ) : (
        <>
          <div>
            {!selectedBoard && (
              <>
                <BoardList
                  boards={boards}
                  onSelectBoard={onSelectBoard}
                  onDeleteBoard={onDeleteBoard}
                />
                <p>✨Select a board to view cards✨</p>
                <button
                  className="action-btn action-btn--icon"
                  onClick={(e) => {
                    e.stopPropagation();
                    setNewBoard(true);
                  }}
                  aria-label="Add board"
                  title="Add board"
                >
                  +
                </button>
              </>
            )}

            {selectedBoard && (
              <div>
                <h2>
                  Current board: {selectedBoard.title} by {selectedBoard.owner}
                </h2>

                <div className="board-actions" onClick={stopClick}>
                  <button
                    className="action-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedBoard(null);
                      setCards([]);
                      setNewCard(false);
                      setOrderedCards(false);
                    }}
                  >
                    Back
                  </button>

                  {!orderedCards ? (
                    <button
                      className="action-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        setOrderedCards(true);
                      }}
                    >
                      Sort
                    </button>
                  ) : (
                    <div
                      onClick={(e) => {
                        e.stopPropagation();
                        setOrderedCards(false);
                      }}
                    >
                      <CardSort value={cardSort} onChange={setCardSort} />
                    </div>
                  )}

                  {!newCard && (
                    <>
                      <button
                        className="action-btn action-btn--icon"
                        onClick={(e) => {
                          e.stopPropagation();
                          setNewCard(true);
                        }}
                        aria-label="Add card"
                        title="Add card"
                      >
                        +
                      </button>

                      <button
                        className="action-btn action-btn--icon"
                        disabled={cards.length === 0}
                        onClick={(e) => {
                          e.stopPropagation();
                          if (
                            !window.confirm(
                              "Remove all cards from this board?"
                            )
                          )
                            return;
                          onDeleteCardsInBoard(selectedBoard.id);
                        }}
                        aria-label="Remove all cards"
                        title="Remove all cards"
                      >
                        🧹
                      </button>
                    </>
                  )}
                </div>

                <CardList
                  cards={sortedCards}
                  onDeleteCard={onDeleteCard}
                  onLikeCard={onLikeCard}
                />
              </div>
            )}
          </div>
        </>
      )}
    </main>
  </div>
);
}

export default App;