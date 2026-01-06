import { UseState } from "react";

const NewBoardForm = () => {
    const [formFields, setFormFields] = useState({
    title: "",
    author: "",
  });

  const handleTitleChange = (event) => {
    setFormFields({
      ...formFields,
      title: event.target.value,
    });
  };

  const handleAuthorChange = (event) => {
    setFormFields({
      ...formFields,
      author: event.target.value,
    });
  };

return (
    <form className="new-board-form">
      <h2>Create New Board</h2>
      <section>
        <label htmlFor="boardTitle">Title:</label>
        <input type="text" id="boardTitle" name="boardTitle" value={formFields.title} onChange={handleTitleChange} required />
      </section>
      <section>
        <label htmlFor="authorName">Author Name:</label>
        <input type="text" id="authorName" name="authorName" value={formFields.author} onChange={handleAuthorChange} required />
      </section>
      <button type="submit" value="Add Board">Create Board</button>
    </form>
  );
};

export default NewBoardForm;