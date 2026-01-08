import PropTypes from 'prop-types';
import Board from './Board.jsx';
import './BoardList.css';

const BoardList = ({ boards, onSelectBoard, onDeleteBoard }) => {

    const getBoardListJSX = (boardList) => {
    return boardList.map((board) => {
        return (
            <Board
                key={board.id}
                id={board.id}
                title={board.title}
                onSelectBoard={onSelectBoard}
                onDeleteBoard={onDeleteBoard}
            />
            );
    });
    };

    return (
        <section className="board-list-section">
            <ul className="board-list no-bullet" >
            {getBoardListJSX(boards)}
            </ul>
        </section>
    );
};

BoardList.propTypes = {
    boards: PropTypes.arrayOf(
    PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        owner: PropTypes.string.isRequired,
    })
    ).isRequired,
    onSelectBoard: PropTypes.func.isRequired,
    onDeleteBoard: PropTypes.func.isRequired,
};

export default BoardList;
