import { useState } from 'react'
import './App.css'
import CardList from './components/CardList';

const kbaseURL = 'https://back-end-inspiration-board-c6cv.onrender.com/';


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
  .delete(`${kbaseURL}`/cards/`${id}`)
  .catch((error) => console.error(error));
};


//onRemoveBoardAPI
const onRemoveBoardAPI = (id) => {
  return axios
  .delete(`${kbaseURL}`/boards/`${id}`)
  .catch((error) => console.error(error));
};


//onLikeCardAPI
//postCardAPI
//getallboards
//getcardsforboard
const onLikeCardAPI = (id) => {
  return axios
  .patch(`${kbaseURL}`/cards/`${id}/like`)
  .catch((error) => console.error(error));
}


//postCardAPI -----Nadia
const addCardAPI = (newCard) => {
  return axios.post(`${kbaseURL}/cards`, newCard)
    .then(response => response.data);
};

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
  
  const onHandleSubmit = (formData) => {
  return addCardAPI(formData).then((createdCard) => {
    return setCardData((prev) => [convertCardToAPI(createdCard), ...prev]); 
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
          onSelect={onSelect}
          onDeleteCard={onDeleteCard}          
          >
          <CardList
          cards={selectedBoard.cards}
          boardId={selectedBoard.id}
          onDeleteCard={onDeleteCard}
          onLikeCard={onLikeCard}
          >
          <NewBoardForm 
          onHandleSubmit={onHandleSubmit}>
          <NewCardForm
          onHandleSubmit={onHandleSubmit}>
        </div>
      </main>
    </div>
  );
};

export default App
