import PropTypes from 'prop-types';
// import './Card.css';

const Card = ({ id, boardId, likesCount, message, onDeleteCard, onLikeCard}) => {

  const likeButtonClicked = () => {
    onLikeCard(boardId, id);
  };

  const deleteButtonClicked = () => {
    onDeleteCard(boardId, id);
  };

  return (
    <div className="card">
      <p>{message}</p>
      <li>
          {likesCount}
          <button onClick={likeButtonClicked}>hearts Emoji</button>
          <button onClick={deleteButtonClicked}>delete Emoji</button>
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