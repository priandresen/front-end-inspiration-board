import PropTypes from 'prop-types';
// import './Card.css';

const Card = ({ id, likesCount, message, onDeleteCard, onLikeCard }) => {

  const likeButtonClicked = () => {
    onLikeCard(id);
  };

  const deleteButtonClicked = () => {
    onDeleteCard(id);
  };

  return (
    <div className="card">
      <p>{message}</p>
      <div>     
          {likesCount}
          <button onClick={likeButtonClicked}>✨</button>
          <button onClick={deleteButtonClicked}>🗑</button>
      </div>
    </div>
  );
};

Card.propTypes = {
  id: PropTypes.number.isRequired,
  likesCount: PropTypes.number.isRequired,
  message: PropTypes.string.isRequired,
  onDeleteCard: PropTypes.func.isRequired,
  onLikeCard: PropTypes.func.isRequired,
};

export default Card;