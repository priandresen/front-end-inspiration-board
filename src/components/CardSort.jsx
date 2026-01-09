import PropTypes from "prop-types";
import './CardSort.css';

const CardSort = ({ value, onChange }) => {
  return (
    <fieldset className="card-sort" onClick={(e) => e.stopPropagation()}>
      
      <label>
        <input
          type="radio"
          name="cardSort"
          value="id"
          checked={value === "id"}
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
