import { useState } from "react";
import './NewBoardForm.css';

const kDefaultFormState = {
    title: "",
    owner: "",
};


const NewBoardForm = ({ onHandleSubmit }) => {
  const [formData, setFormData] = useState(kDefaultFormState);
  const [error, setError] = useState("");

  const handleChange = (event) => {
    setFormData({
    ...formData,
    [event.target.name]: event.target.value,
    });
    setError("");
};

const handleSubmit = (event) => {
    event.preventDefault();
    
    const payload = {
      title: formData.title.trim(),
      owner: formData.owner.trim(),
    };

    return onHandleSubmit(payload)
      .then(() => {
        setFormData(kDefaultFormState);
        setError("");
      })
      .catch((err) => {
        const details = err?.response?.data?.details;
        setError(details || "Could not create board.");
      });
  };

  const makeControlledInput = (name) => {
    return <input type="text" 
		id={`input-${name}`} 
		name={name}
		value={formData[name]}
		onChange={handleChange} required
    className={error ? "input-error" : ""}/>;
	};

return (
    <form onSubmit={handleSubmit} className="new-board-form">
      <h2>Create New Board</h2>
      <section>
        <label htmlFor="input-title">Title:</label>
        {makeControlledInput("title")}
      </section>
      <section>
        <label htmlFor="input-owner">Owner Name:</label>
        {makeControlledInput("owner")}
      </section>

      {error && <p className="error-text">{error}</p>}

      <button type="submit">Create Board</button>
    </form>
  );
};

export default NewBoardForm;