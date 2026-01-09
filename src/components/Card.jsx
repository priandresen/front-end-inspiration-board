import PropTypes from 'prop-types';
import './Card.css';

const Card = ({ id, likesCount, message, onDeleteCard, onLikeCard }) => {

  const likeButtonClicked = () => {
    onLikeCard(id);
  };

  const deleteButtonClicked = () => {
    onDeleteCard(id);
  };

  return (
  <div className="card">
    <h3>{message}</h3>

    <div className="buttons-row">

        {likesCount}{" "}
        <button
          className="like-button"
          onClick={(e) => {
            e.stopPropagation();
            likeButtonClicked();
          }}
        >
          ✨
        </button>


      <button
        className="delete-button"
        onClick={(e) => {
          e.stopPropagation();
          deleteButtonClicked();
        }}
      >
        🗑
      </button>
    </div>
  </div>
);
}

Card.propTypes = {
  id: PropTypes.number.isRequired,
  likesCount: PropTypes.number.isRequired,
  message: PropTypes.string.isRequired,
  onDeleteCard: PropTypes.func.isRequired,
  onLikeCard: PropTypes.func.isRequired,
};

export default Card;