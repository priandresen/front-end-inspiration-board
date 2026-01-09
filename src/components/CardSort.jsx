import PropTypes from "prop-types";
import './CardSort.css';

const CardSort = ({ value, onChange }) => {
  return (
    <fieldset className="card-sort">
      <label>
        <input
          type="radio"
          name="cardSort"
          value="id"
          checked={value === "id"}
          onClick={(e) => e.stopPropagation()}
          onChange={(e) => onChange(e.target.value)}
        />
        by id
      </label>

      <label>
        <input
          type="radio"
          name="cardSort"
          value="alpha"
          checked={value === "alpha"}
          onClick={(e) => e.stopPropagation()}
          onChange={(e) => onChange(e.target.value)}
        />
        alphabetically
      </label>

      <label>
        <input
          type="radio"
          name="cardSort"
          value="likes"
          checked={value === "likes"}
          onClick={(e) => e.stopPropagation()}
          onChange={(e) => onChange(e.target.value)}
        />
        by likes
      </label>
    </fieldset>
  );
};

CardSort.propTypes = {
  value: PropTypes.oneOf(["id", "alpha", "likes"]).isRequired,
  onChange: PropTypes.func.isRequired,
};

export default CardSort;
