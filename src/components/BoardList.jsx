import PropTypes from 'prop-types';
import Board from './Board.jsx';
// import './BoardList.css';

const BoardList = ({ boards, onSelectBoard }) => {

    const getBoardListJSX = (boards) => {
    return boards.map((board) => {
        return (
            <Board
                key={board.id}
                id={board.id}
                owner={board.owner}
                onSelectBoard={onSelectBoard}
            />
            );
    });
    };

    return (
    <ul className="boards__list no-bullet">
    {getBoardListJSX(boards)}
    </ul>
    );
};

BoardList.propTypes = {
    boards: PropTypes.arrayOf(
    PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
    })
    ).isRequired,
    selectedBoardId: PropTypes.number,
    onSelectBoard: PropTypes.func.isRequired,
    onDeleteCard: PropTypes.func.isRequired,
    onLikeCard: PropTypes.func.isRequired,
    cardsByBoard: PropTypes.object.isRequired
};

export default BoardList;
