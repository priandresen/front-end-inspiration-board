import React from 'react';
import PropTypes from 'prop-types';
import CardList from './CardList.jsx';

const Board = ({ id, owner, onSelectBoard }) => {

    const handleClick = () => {
        onSelectBoard(id);
    };

    return (
    <div className="board" onClick={handleClick}>
        <h2>{owner}</h2>
        {/* <p>Board ID: {id}</p> */}
    </div>
    );
};

Board.propTypes = {
    id: PropTypes.number.isRequired,
    owner: PropTypes.string.isRequired,
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
