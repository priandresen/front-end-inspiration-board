import PropTypes from 'prop-types';
import Card from './Card.jsx';
import './CardList.css';

const CardList = ({ cards, onDeleteCard, onLikeCard }) => {
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

    return (
    <div className="card-list">
      {getCardListJSX(cards)}
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
};

export default CardList;