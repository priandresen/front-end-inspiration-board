import PropTypes from 'prop-types';
import './Board.css';

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
        <h2><button onClick={handleClick}>{title}</button></h2>
        <p>by {owner}</p> 
        <button onClick={handleDelete}>🗑</button>
    </div>
    );
};

Board.propTypes = {
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    owner: PropTypes.string.isRequired,
    onSelectBoard: PropTypes.func.isRequired,
    onDeleteBoard: PropTypes.func.isRequired,
};

export default Board;