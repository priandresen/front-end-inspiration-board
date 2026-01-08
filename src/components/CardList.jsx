import PropTypes from 'prop-types';
import Card from './Card.jsx';
import './CardList.css';

const CardList = ({ cards, onDeleteCard, onLikeCard, onDeleteCardsInBoard, boardId }) => {
  const getCardListJSX = (cardList) => {
    return cardList.map((card) => {
      return (
        <Card
          key={card.id}
          id={card.id}
					likesCount={card.likesCount}
          message={card.message}
          onDeleteCard={onDeleteCard}
          onLikeCard={onLikeCard}
        />
      );
    });
  }
  
	const handleDeleteCards = () => {
	    onDeleteCardsInBoard(boardId); // id is the board id
	    console.log(`All cards for board ${boardId} deleted`);
	};

    return (
    <div className="card-list">
      {getCardListJSX(cards)}
		<button className='reset-button' onClick={handleDeleteCards}>reset board</button>
    </div>
  );
};

CardList.propTypes = {
  cards: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      likesCount: PropTypes.number.isRequired,
      message: PropTypes.string.isRequired,
    })
  ).isRequired,
  onDeleteCard: PropTypes.func.isRequired,
  onLikeCard: PropTypes.func.isRequired,
	onDeleteCardsInBoard: PropTypes.func.isRequired,
  boardId: PropTypes.number.isRequired,
};

export default CardList;