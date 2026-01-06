import { useState } from "react";

const NewCardForm = ({ onHandleSubmit }) => {
    const [formFields, setFormFields] = useState({
        message: "",
    });

    const handleMessageChange = (event) => {
        setFormFields({
            ...formFields,
            message: event.target.value,
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        onHandleSubmit(formFields);
        setFormFields({
            message: "",
        });
    };


    return (
        <form className="newCardForm" onSubmit={handleSubmit}>
            <h2>Create New Card</h2>
            <section>
                <label htmlFor="cardMessage">Card Message:</label>
                <input type="text" id="cardMessage" name="cardMessage" value={formFields.message} onChange={handleMessageChange} required />
            </section>
            <button type="submit" value="Add card">Create Card</button>
        </form>
    );
};

export default NewCardForm;