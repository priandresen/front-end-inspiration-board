import PropTypes from 'prop-types';

const Board = ({ title, id, owner, onSelectBoard, onDeleteBoard,onDeleteCardsInBoard }) => {

    const handleClick = () => {
        onSelectBoard(id);
        console.log(`Board ${id} selected`);
    };

    const handleDelete = () => {
        onDeleteBoard(id);
        console.log(`Board ${id} deleted`);
    };

    const handleDeleteCards = () => {
        onDeleteCardsInBoard(id); // id is the board id
        console.log(`All cards for board ${id} deleted`);
    };

    return (
    <div className="board" >
        <button onClick={handleClick}>{title}</button>
        by {owner}
        <button onClick={handleDelete}>delete Emoji</button>
        <button onClick={handleDeleteCards}>Delete ALL Cards</button>
    </div>
    );
};

Board.propTypes = {
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    owner: PropTypes.string.isRequired,
    onSelectBoard: PropTypes.func.isRequired,
    onDeleteBoard: PropTypes.func.isRequired,
    onDeleteCardsInBoard: PropTypes.func.isRequired, 
};

export default Board;