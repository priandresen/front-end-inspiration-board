// import React from 'react';
import PropTypes from 'prop-types';
import CardList from './CardList.jsx';

const Board = ({ id, name, cards, onDeleteCard, onLikeCard }) => {
    return (
    <div className="board">
        <h2>{name}</h2>
        <p>Board ID: {id}</p>

      {/* Render cards for this board */}
        <CardList
        cards={cards}
        boardId={id}
        onDeleteCard={onDeleteCard}
        onLikeCard={onLikeCard}
        />
    </div>
    );
};

Board.propTypes = {
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
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

export default Board;
