import { useState } from "react";

const kDefaultFormState = {
    title: "",
    owner: "",
};


const NewBoardForm = ({ onHandleSubmit }) => {
  const [formData, setFormData] = useState(kDefaultFormState);

  const handleChange = (event) => {
    setFormData({
    ...formData,
    [event.target.name]: event.target.value,
    });
};

const handleSubmit = (event) => {
    event.preventDefault();
    onHandleSubmit(formData)
    .then(() => {
      setFormData(kDefaultFormState);
    });
  };

  const makeControlledInput = (name) => {
    return <input type="text" 
		id={`-input-${name}`} 
		name={name}
		value={formData[name]}
		onChange={handleChange} required />;
	};

//   const handleTitleChange = (event) => {
//     setFormData({
//       ...formData,
//       title: event.target.value,
//     });
//   };

//   const handleOwnerChange = (event) => {
//     setFormData({
//       ...formData,
//       owner: event.target.value,
//     });
//   };

return (
    <form onSubmit={handleSubmit} className="new-board-form">
      <h2>Create New Board</h2>
      <section>
        <label htmlFor="boardTitle">Title:</label>
        {makeControlledInput("title")}
      </section>
      <section>
        <label htmlFor="ownerName">Owner Name:</label>
        {makeControlledInput("owner")}
      </section>
      <button type="submit" value="Add Board">Create Board</button>
    </form>
  );
};

export default NewBoardForm;