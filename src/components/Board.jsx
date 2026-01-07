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
    <li className="board" >
        <button onClick={handleClick}>{title}</button>
        <button onClick={handleDelete}>🗑</button>
    </li>
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