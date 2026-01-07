import React from 'react';
import PropTypes from 'prop-types';
import CardList from './CardList.jsx';

const Board = ({ title, id, owner, onSelectBoard, onDeleteBoard }) => {

    const handleClick = () => {
        onSelectBoard(id);
        console.log(`Board ${id} selected`);
    };

    const handleDelete = () => {
        onDeleteBoard(id);
        console.log(`Board ${id} deleted`);
    };

    return (
    <div className="board" >
        <button onClick={() => {handleClick()}}>{title}</button>
        by {owner}
        <button onClick={() => {handleDelete(id)}}>delete Emoji</button>
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
