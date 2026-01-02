import PropTypes from 'prop-types';
import './Card.css';

const Card = ({ id, boardId, likesCount, message, onDeleteCard, onLikeCard}) => {


  return (
    <div className="card">
      <p>{message}</p>
      <li>
          {likesCount}
          <button onClick={() => onLikeCard(boardId, id)}>hearts Emoji</button>
          <button onClick={() => onDeleteCard(boardId, id)}>delete Emoji</button>
      </li>
    </div>

    );

};

Card.propTypes = {
  id: PropTypes.number.isRequired,
  boardId: PropTypes.number.isRequired,
  likesCount: PropTypes.number.isRequired,
  message: PropTypes.string.isRequired,
  onDeleteCard: PropTypes.func.isRequired,
  onLikeCard: PropTypes.func.isRequired,
};

export default Card;